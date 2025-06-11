
import { RefObject } from 'react';

export interface GMMPoint {
  x: number;
  y: number;
  cluster: number;
  opacity: number;
  radius: number;
}

export interface Cluster {
  meanX: number;
  meanY: number;
  weight: number;
  color: string;
  label: string;
}

export interface ResultsProps {
  healthProfile: any;
  userCluster: number;
}

export interface GMMVisualizationProps {
  canvasRef: RefObject<HTMLCanvasElement>;
  userCluster: number;
  clusters: Cluster[];
}

export interface ClusterSummaryProps {
  userCluster: number;
  clusters: Cluster[];
  healthProfile: any;
}

export interface ResultsHeaderProps {
  title: string;
  subtitle: string;
}
