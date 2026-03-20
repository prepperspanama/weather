export default function Skeleton() {
  return (
    <div className="skeleton-container">
      <div className="skeleton-header">
        <div className="skeleton-circle" />
        <div className="skeleton-line w-40" />
        <div className="skeleton-circle" />
      </div>
      <div className="skeleton-temp">
        <div className="skeleton-line w-24" />
        <div className="skeleton-block w-32 h-20" />
        <div className="skeleton-line w-20" />
      </div>
      <div className="skeleton-grid">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="skeleton-card">
            <div className="skeleton-line w-16" />
            <div className="skeleton-block w-12 h-8" />
          </div>
        ))}
      </div>
      <div className="skeleton-card skeleton-hourly">
        <div className="skeleton-line w-40" />
        <div className="skeleton-row">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="skeleton-hour-item">
              <div className="skeleton-line w-10" />
              <div className="skeleton-circle-sm" />
              <div className="skeleton-line w-8" />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
