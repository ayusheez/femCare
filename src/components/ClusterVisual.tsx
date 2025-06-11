
import React, { useRef, useEffect, useState } from 'react';
import FadeIn from './FadeIn';
import { ArrowRight, ChevronRight, Heart, Users, Zap } from 'lucide-react';
import Button from './Button';

interface Cluster {
  id: number;
  name: string;
  color: string;
  size: number;
  description: string;
  traits: string[];
  recommendations: string[];
}

const clusters: Cluster[] = [
  {
    id: 1,
    name: "Preventive Focus",
    color: "#6C8EE3",
    size: 100,
    description: "Women prioritizing preventive care and regular checkups",
    traits: ["Regular screenings", "Nutritional awareness", "Active lifestyle"],
    recommendations: ["Annual wellness exams", "Bone density screening", "Heart health monitoring"]
  },
  {
    id: 2,
    name: "Family Planning",
    color: "#94A6F0",
    size: 80,
    description: "Women in various stages of family planning and pregnancy",
    traits: ["Prenatal focus", "Genetic screening", "Hormonal balance"],
    recommendations: ["Prenatal vitamins", "Fertility tracking", "Genetic counseling"]
  },
  {
    id: 3,
    name: "Holistic Health",
    color: "#53629E",
    size: 60,
    description: "Women taking an integrative approach to health and wellness",
    traits: ["Mind-body practices", "Alternative therapies", "Stress management"],
    recommendations: ["Meditation programs", "Nutrition counseling", "Sleep optimization"]
  },
  {
    id: 4,
    name: "Active Lifestyle",
    color: "#8BAEFF",
    size: 90,
    description: "Women maintaining high levels of physical activity and fitness",
    traits: ["Regular exercise", "Performance tracking", "Injury prevention"],
    recommendations: ["Joint health", "Cardiac performance", "Recovery optimization"]
  },
  {
    id: 5,
    name: "Chronic Management",
    color: "#4A5C99",
    size: 70,
    description: "Women managing ongoing health conditions with proactive approaches",
    traits: ["Condition monitoring", "Medication management", "Specialist coordination"],
    recommendations: ["Symptom tracking tools", "Specialist referrals", "Support groups"]
  }
];

const ClusterVisual: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [selectedCluster, setSelectedCluster] = useState<Cluster | null>(null);
  const [isAnimating, setIsAnimating] = useState(true);
  
  // Animation and canvas rendering
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Set canvas dimensions
    const resizeCanvas = () => {
      const { width, height } = canvas.getBoundingClientRect();
      canvas.width = width;
      canvas.height = height;
    };
    
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    
    // Prepare cluster nodes with positions
    const nodes = clusters.map((cluster, index) => {
      const angle = (index / clusters.length) * Math.PI * 2;
      const radius = Math.min(canvas.width, canvas.height) * 0.35;
      return {
        ...cluster,
        x: canvas.width / 2 + Math.cos(angle) * radius,
        y: canvas.height / 2 + Math.sin(angle) * radius,
        radius: cluster.size * 0.3,
        vx: 0,
        vy: 0,
        targetX: canvas.width / 2 + Math.cos(angle) * radius,
        targetY: canvas.height / 2 + Math.sin(angle) * radius,
      };
    });
    
    // Center node representing the algorithm
    const centerNode = {
      x: canvas.width / 2,
      y: canvas.height / 2,
      radius: 30,
      color: 'rgba(255, 255, 255, 0.9)'
    };
    
    let animationFrameId: number;
    let lastTime = 0;
    
    const animate = (time: number) => {
      if (!ctx || !isAnimating) return;
      
      const deltaTime = time - lastTime;
      lastTime = time;
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw connections between center and nodes
      nodes.forEach(node => {
        ctx.beginPath();
        ctx.moveTo(centerNode.x, centerNode.y);
        ctx.lineTo(node.x, node.y);
        ctx.strokeStyle = `${node.color}40`;
        ctx.lineWidth = 2;
        ctx.stroke();
        
        // Update node positions with gentle movement
        node.vx = (node.targetX - node.x) * 0.03;
        node.vy = (node.targetY - node.y) * 0.03;
        
        node.x += node.vx;
        node.y += node.vy;
        
        // Add subtle oscillation
        node.targetX = canvas.width / 2 + Math.cos((time * 0.0003) + (nodes.indexOf(node) * Math.PI / 2.5)) * (Math.min(canvas.width, canvas.height) * 0.35);
        node.targetY = canvas.height / 2 + Math.sin((time * 0.0003) + (nodes.indexOf(node) * Math.PI / 2.5)) * (Math.min(canvas.width, canvas.height) * 0.35);
      });
      
      // Draw center node (algorithm hub)
      ctx.beginPath();
      ctx.arc(centerNode.x, centerNode.y, centerNode.radius, 0, Math.PI * 2);
      ctx.fillStyle = centerNode.color;
      ctx.shadowColor = 'rgba(108, 142, 227, 0.5)';
      ctx.shadowBlur = 15;
      ctx.fill();
      ctx.shadowBlur = 0;
      
      // Draw algorithm text
      ctx.font = '10px Inter, sans-serif';
      ctx.fillStyle = '#53629E';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('CLUSTERING', centerNode.x, centerNode.y - 5);
      ctx.fillText('ALGORITHM', centerNode.x, centerNode.y + 5);
      
      // Draw the cluster nodes
      nodes.forEach(node => {
        // Outer glow
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius + 3, 0, Math.PI * 2);
        ctx.fillStyle = `${node.color}20`;
        ctx.fill();
        
        // Node circle
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        ctx.fillStyle = node.color;
        ctx.fill();
        
        // Node label
        ctx.font = 'bold 10px Inter, sans-serif';
        ctx.fillStyle = 'white';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(node.name, node.x, node.y);
      });
      
      animationFrameId = requestAnimationFrame(animate);
    };
    
    animationFrameId = requestAnimationFrame(animate);
    
    // Handle interaction
    const handleMouseMove = (e: MouseEvent) => {
      if (!canvas) return;
      
      const rect = canvas.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;
      
      let hoveredNode = null;
      
      // Check if mouse is over any node
      for (const node of nodes) {
        const dx = mouseX - node.x;
        const dy = mouseY - node.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < node.radius) {
          hoveredNode = node;
          break;
        }
      }
      
      // Update cursor style
      canvas.style.cursor = hoveredNode ? 'pointer' : 'default';
    };
    
    const handleClick = (e: MouseEvent) => {
      if (!canvas) return;
      
      const rect = canvas.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;
      
      // Check if any node was clicked
      for (const node of nodes) {
        const dx = mouseX - node.x;
        const dy = mouseY - node.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < node.radius) {
          setSelectedCluster(clusters.find(c => c.id === node.id) || null);
          break;
        }
      }
    };
    
    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('click', handleClick);
    
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('click', handleClick);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isAnimating]);
  
  return (
    <section id="clusters" className="py-20 bg-white relative">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <FadeIn>
            <h2 className="text-3xl md:text-4xl font-semibold mb-4">
              Discover Your <span className="text-gradient">Health Cluster</span>
            </h2>
          </FadeIn>
          <FadeIn delay={100}>
            <p className="text-lg text-fem-dark/80">
              Our algorithm identifies distinct health profiles among women, helping you find your optimal healthcare path.
            </p>
          </FadeIn>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
          <FadeIn delay={200} className="lg:col-span-2">
            <div className="bg-fem-light rounded-xl overflow-hidden relative h-[400px] md:h-[500px]">
              <canvas 
                ref={canvasRef} 
                className="w-full h-full"
              />
              <div className="absolute bottom-4 left-4 text-xs text-fem-dark/60">
                Click on any cluster to learn more
              </div>
            </div>
          </FadeIn>
          
          <FadeIn delay={300}>
            <div className="glass rounded-xl p-6 border border-white/50 h-full">
              {selectedCluster ? (
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div 
                      className="w-10 h-10 rounded-full flex items-center justify-center"
                      style={{ backgroundColor: selectedCluster.color }}
                    >
                      <Users size={20} className="text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-medium">{selectedCluster.name}</h3>
                      <p className="text-sm text-fem-dark/70">Health Profile</p>
                    </div>
                  </div>
                  
                  <p className="text-sm text-fem-dark/80 mb-4">
                    {selectedCluster.description}
                  </p>
                  
                  <div className="mb-4">
                    <h4 className="text-sm font-medium mb-2 flex items-center gap-2">
                      <Heart size={16} className="text-fem-primary" />
                      Key Traits
                    </h4>
                    <ul className="space-y-1">
                      {selectedCluster.traits.map((trait, i) => (
                        <li key={i} className="text-sm text-fem-dark/80 flex items-start gap-2">
                          <ChevronRight size={16} className="text-fem-primary flex-shrink-0 mt-0.5" />
                          <span>{trait}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="mb-6">
                    <h4 className="text-sm font-medium mb-2 flex items-center gap-2">
                      <Zap size={16} className="text-fem-primary" />
                      Recommendations
                    </h4>
                    <ul className="space-y-1">
                      {selectedCluster.recommendations.map((rec, i) => (
                        <li key={i} className="text-sm text-fem-dark/80 flex items-start gap-2">
                          <ChevronRight size={16} className="text-fem-primary flex-shrink-0 mt-0.5" />
                          <span>{rec}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <Button 
                    variant="outline" 
                    size="sm" 
                    fullWidth 
                    icon={<ArrowRight size={16} />} 
                    iconPosition="right"
                  >
                    Learn More About This Cluster
                  </Button>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <Users size={40} className="text-fem-primary/40 mb-4" />
                  <h3 className="text-xl font-medium mb-2">Explore Health Clusters</h3>
                  <p className="text-sm text-fem-dark/70 mb-4">
                    Click on a cluster in the visualization to see detailed information.
                  </p>
                  <p className="text-xs text-fem-dark/50 italic">
                    Each cluster represents a distinct pattern of health needs and preferences.
                  </p>
                </div>
              )}
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
};

export default ClusterVisual;
