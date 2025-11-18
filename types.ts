export interface NavItem {
  label: string;
  href: string;
}

export interface GearProps {
  teeth: number;
  radius: number;
  holeRadius?: number;
  rotation: number;
  color: string;
  type?: 'sun' | 'planet' | 'ring';
  className?: string;
}