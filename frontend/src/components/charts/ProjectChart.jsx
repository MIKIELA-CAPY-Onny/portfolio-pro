import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, Cell,
} from 'recharts';

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div
      className="p-3 rounded-xl text-sm shadow-xl"
      style={{
        backgroundColor: 'var(--bg-tertiary)',
        border: '1px solid var(--border-color)',
        color: 'var(--text-primary)',
      }}
    >
      <p className="font-medium mb-1">{label}</p>
      <p style={{ color: 'var(--color-primary-light)' }}>
        {payload[0].value} projet{payload[0].value > 1 ? 's' : ''}
      </p>
    </div>
  );
};

const ProjectChart = ({ data = [] }) => {
  return (
    <div className="admin-card">
      <h3 className="text-base font-semibold mb-4"
          style={{ color: 'var(--text-primary)' }}>
        Évolution des projets
      </h3>
      {data.length === 0 ? (
        <div className="h-48 flex items-center justify-center"
             style={{ color: 'var(--text-muted)' }}>
          Aucune donnée disponible
        </div>
      ) : (
        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={data} margin={{ top: 5, right: 5, left: -20, bottom: 5 }}>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="var(--border-color)"
              vertical={false}
            />
            <XAxis
              dataKey="month"
              tick={{ fontSize: 12, fill: 'var(--text-muted)' }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              tick={{ fontSize: 12, fill: 'var(--text-muted)' }}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(99,102,241,0.05)' }} />
            <Bar dataKey="count" radius={[6, 6, 0, 0]}>
              {data.map((_, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={`url(#gradient-project-${index})`}
                />
              ))}
            </Bar>
            <defs>
              {data.map((_, index) => (
                <linearGradient
                  key={index}
                  id={`gradient-project-${index}`}
                  x1="0" y1="0" x2="0" y2="1"
                >
                  <stop offset="0%" stopColor="#6366f1" stopOpacity={1} />
                  <stop offset="100%" stopColor="#0ea5e9" stopOpacity={0.8} />
                </linearGradient>
              ))}
            </defs>
          </BarChart>
        </ResponsiveContainer>
      )}
    </div>
  );
};

export default ProjectChart;