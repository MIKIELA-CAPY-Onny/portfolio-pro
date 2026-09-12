import {
  LineChart, Line, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, Area, AreaChart,
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
      <p style={{ color: 'var(--color-secondary)' }}>
        {payload[0].value} visiteur{payload[0].value > 1 ? 's' : ''}
      </p>
    </div>
  );
};

const VisitorChart = ({ data = [] }) => {
  return (
    <div className="admin-card">
      <h3 className="text-base font-semibold mb-4"
          style={{ color: 'var(--text-primary)' }}>
        Évolution des visiteurs
      </h3>
      {data.length === 0 ? (
        <div className="h-48 flex items-center justify-center"
             style={{ color: 'var(--text-muted)' }}>
          Aucune donnée disponible
        </div>
      ) : (
        <ResponsiveContainer width="100%" height={220}>
          <AreaChart data={data} margin={{ top: 5, right: 5, left: -20, bottom: 5 }}>
            <defs>
              <linearGradient id="visitor-gradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="var(--border-color)"
              vertical={false}
            />
            <XAxis
              dataKey="date"
              tick={{ fontSize: 12, fill: 'var(--text-muted)' }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              tick={{ fontSize: 12, fill: 'var(--text-muted)' }}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey="count"
              stroke="#0ea5e9"
              strokeWidth={2.5}
              fill="url(#visitor-gradient)"
              dot={false}
              activeDot={{ r: 5, fill: '#0ea5e9' }}
            />
          </AreaChart>
        </ResponsiveContainer>
      )}
    </div>
  );
};

export default VisitorChart;