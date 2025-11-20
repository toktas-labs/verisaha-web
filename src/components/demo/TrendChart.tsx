"use client";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

interface TrendChartProps {
  label: number | string;
  data: (number | string)[];
  polling?: boolean;
  scanRate?: number;
}

export default function TrendChart({
  label,
  data,
  polling,
  scanRate = 1000,
}: TrendChartProps) {
  const stepSeconds = scanRate / 1000;

  const chartData =
    data?.map((value, i) => ({
      zaman: i * stepSeconds,
      sorgu: i + 1,
      value:
        typeof value === "string" ? parseFloat(value as string) || null : value,
    })) || [];

  const validData = chartData.filter(
    (d) => typeof d.value === "number" && !isNaN(d.value)
  );

  // 🎨 Renk paleti
  const colors = [
    "#1B3B5F", "#2563EB", "#3B82F6", "#60A5FA",
    "#2FA89B", "#10B981", "#34D399", "#6EE7B7",
    "#F97316", "#FB923C", "#F59E0B", "#FBBF24",
    "#9333EA", "#A855F7", "#C084FC",
    "#EF4444", "#F87171", "#FCA5A5",
  ];
  const color = colors[Number(label) % colors.length];

  if (!validData.length) {
    return (
      <div className="text-center text-gray-500 text-sm mt-4">
        📊 Geçerli veri bulunamadı.
      </div>
    );
  }

  return (
    <div className="mt-8 p-4 border rounded-xl bg-white shadow-sm">
      <h3 className="text-lg font-semibold text-brand-navy text-center mb-3">
        Register {label} Trend
      </h3>

      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={validData}
            margin={{ top: 10, right: 30, left: 0, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis
              dataKey="zaman"
              type="number"
              domain={[0, "dataMax"]}
              ticks={validData.map((d) => d.zaman)}   // 🔹 tam 0,3,6,9... değerleri
              tickFormatter={(t) => `${t}`}          // etikete saniye ekle
              allowDecimals={false}
              label={{
                value: "Zaman (s)",
                position: "insideBottomRight",
                offset: -5,
                dy: 5, // 🔹 yazıyı biraz aşağı taşır
                style: { fontSize: 12, fill: "#374151" },
              }}
            />
            <YAxis
              domain={["auto", "auto"]}
              allowDecimals={true}
              tickFormatter={(v) => v.toFixed(0)}
              tick={({ x, y, payload }) => {
                const value = payload.value;
                const isBig = Math.abs(value) >= 1_000_000;
                const fontSize = isBig ? 10 : 12; // 🔹 büyük sayılar için daha küçük yazı
                return (
                  <text
                    x={x}
                    y={y + 3}
                    textAnchor="end"
                    fill="#374151"
                    fontSize={fontSize}
                    fontFamily="monospace"
                  >
                    {value.toFixed(0)} {/* 🔹 binlik ayırıcı kaldırıldı */}
                  </text>
                );
              }}
            />
            <Tooltip
              formatter={(v: any) => (typeof v === "number" ? v.toFixed(3) : v)}
              labelFormatter={(l) => `${l} s`}
            />
            <Legend />
            <Line
              type="monotone"
              dataKey="value"
              name="Değer"
              stroke={color}
              strokeWidth={2}
              dot={{ r: 3 }}
              activeDot={{ r: 5 }}
              isAnimationActive={polling}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
