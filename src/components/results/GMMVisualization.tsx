
import React, { useEffect, useState } from 'react';
import { GMMVisualizationProps, GMMPoint } from './types';

const GMMVisualization: React.FC<GMMVisualizationProps> = ({ 
  canvasRef, 
  userCluster, 
  clusters 
}) => {
  const [animationFrame, setAnimationFrame] = useState<number | null>(null);

  // Create random GMM points based on clusters
  const generateGMMPoints = (count: number): GMMPoint[] => {
    const points: GMMPoint[] = [];
    for (let i = 0; i < count; i++) {
      // Choose a cluster based on weights
      const random = Math.random();
      let cumulativeWeight = 0;
      let clusterIndex = 0;
      
      for (let j = 0; j < clusters.length; j++) {
        cumulativeWeight += clusters[j].weight;
        if (random < cumulativeWeight) {
          clusterIndex = j;
          break;
        }
      }
      
      const cluster = clusters[clusterIndex];
      
      // Gaussian random values with Box-Muller transform
      const u1 = Math.random();
      const u2 = Math.random();
      const z1 = Math.sqrt(-2 * Math.log(u1)) * Math.cos(2 * Math.PI * u2);
      const z2 = Math.sqrt(-2 * Math.log(u1)) * Math.sin(2 * Math.PI * u2);
      
      // Standard deviation for clusters
      const stdDev = 40;
      
      points.push({
        x: cluster.meanX + z1 * stdDev,
        y: cluster.meanY + z2 * stdDev,
        cluster: clusterIndex,
        opacity: 0.5 + Math.random() * 0.5,
        radius: 3 + Math.random() * 5
      });
    }
    return points;
  };

  // Draw GMM visualization
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Set canvas dimensions
    const resizeCanvas = () => {
      canvas.width = canvas.clientWidth;
      canvas.height = canvas.clientHeight;
    };
    
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    
    // Generate points
    const points = generateGMMPoints(500);
    
    // Add user point (with animation)
    let userPointOpacity = 0;
    let userPointRadius = 0;
    let tick = 0;
    
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw GMM points
      points.forEach(point => {
        ctx.beginPath();
        ctx.arc(point.x, point.y, point.radius, 0, Math.PI * 2);
        ctx.fillStyle = `${clusters[point.cluster].color}${Math.floor(point.opacity * 255).toString(16).padStart(2, '0')}`;
        ctx.fill();
      });
      
      // Draw cluster labels
      clusters.forEach((cluster, index) => {
        ctx.font = 'bold 14px Inter, sans-serif';
        ctx.fillStyle = '#000000'; // Black text for better visibility
        ctx.textAlign = 'center';
        
        // Draw text background for better visibility
        const textWidth = ctx.measureText(cluster.label).width;
        ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
        ctx.fillRect(cluster.meanX - textWidth/2 - 5, cluster.meanY - 40, textWidth + 10, 20);
        
        // Draw text
        ctx.fillStyle = '#000000';
        ctx.fillText(cluster.label, cluster.meanX, cluster.meanY - 30);
        
        // Highlight user's cluster
        if (index === userCluster) {
          ctx.beginPath();
          const pulseRadius = 50 + Math.sin(tick * 0.05) * 10;
          ctx.arc(cluster.meanX, cluster.meanY, pulseRadius, 0, Math.PI * 2);
          ctx.strokeStyle = `${cluster.color}80`; // More visible highlight
          ctx.lineWidth = 3;
          ctx.stroke();
        }
      });
      
      // Animate user point appearing
      if (userPointOpacity < 1) {
        userPointOpacity += 0.01;
      }
      
      if (userPointRadius < 12) {
        userPointRadius += 0.2;
      }
      
      // Draw user point
      if (userCluster >= 0 && userCluster < clusters.length) {
        const userClusterData = clusters[userCluster];
        
        // Draw glow effect
        ctx.beginPath();
        ctx.arc(userClusterData.meanX, userClusterData.meanY, userPointRadius + 5, 0, Math.PI * 2);
        ctx.fillStyle = `${userClusterData.color}40`;
        ctx.fill();
        
        ctx.beginPath();
        ctx.arc(userClusterData.meanX, userClusterData.meanY, userPointRadius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${userPointOpacity})`;
        ctx.strokeStyle = userClusterData.color;
        ctx.lineWidth = 3;
        ctx.fill();
        ctx.stroke();
        
        // Draw text background for "YOU" label
        const youTextWidth = ctx.measureText('YOU').width;
        ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
        ctx.fillRect(userClusterData.meanX - youTextWidth/2 - 5, userClusterData.meanY - 7, youTextWidth + 10, 14);
        
        // Draw "YOU" text
        ctx.font = 'bold 12px Inter, sans-serif';
        ctx.fillStyle = '#000000'; // Black text for better visibility
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('YOU', userClusterData.meanX, userClusterData.meanY);
      }
      
      tick++;
      setAnimationFrame(requestAnimationFrame(animate));
    };
    
    animate();
    
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [userCluster, clusters, canvasRef]);

  return (
    <div className="relative h-[400px] bg-white rounded-lg border border-fem-soft/30 overflow-hidden shadow-sm">
      <canvas ref={canvasRef} className="w-full h-full"></canvas>
    </div>
  );
};

export default GMMVisualization;
