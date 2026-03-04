export const Logo = ({ size = 32, className = "" }) => (
  <img
    src="/Rectangle1.png"
    alt="Logo"
    width={size}
    height={size}
    className={className}
    style={{ objectFit: 'contain' }}
  />
);
