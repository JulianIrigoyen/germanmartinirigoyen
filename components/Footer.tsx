export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="py-12 text-center">
      <p className="font-body text-sm text-gallery-muted">
        Buenos Aires, Argentina
      </p>
      <p className="font-body text-sm text-gallery-muted mt-1">
        <a
          href="https://instagram.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-gallery-text transition-colors"
        >
          @germanmartinirigoyen
        </a>
        {" / "}
        <a
          href="mailto:german@germanmartinirigoyen.com"
          className="hover:text-gallery-text transition-colors"
        >
          german@germanmartinirigoyen.com
        </a>
      </p>
      <p className="font-body text-xs text-gallery-muted/60 mt-4">
        &copy; {year} Germán Martín Irigoyen
      </p>
    </footer>
  );
}
