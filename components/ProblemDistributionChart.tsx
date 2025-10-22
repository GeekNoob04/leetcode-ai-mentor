"use client";

import {
    Bar,
    BarChart,
    CartesianGrid,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    Cell,
    LabelList,
} from "recharts";

interface Props {
    easy: number;
    medium: number;
    hard: number;
}

export default function ProblemDistributionChart({
    easy,
    medium,
    hard,
}: Props) {
    const data = [
        { name: "Easy", value: easy },
        { name: "Medium", value: medium },
        { name: "Hard", value: hard },
    ];

    const colors = ["#34d399", "#fbbf24", "#fb7185"]; // easy, medium, hard

    return (
        <div className="bg-slate-900/70 border border-slate-800/60 rounded-2xl p-6 shadow-sm mt-6">
            <h2 className="text-lg font-semibold text-slate-100 mb-4">
                Problem Distribution
            </h2>

            <div className="bg-slate-950/40 rounded-lg p-4 backdrop-blur-sm">
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart
                        data={data}
                        margin={{ top: 12, right: 18, left: 0, bottom: 6 }}
                    >
                        <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" />
                        <XAxis
                            dataKey="name"
                            stroke="#64748b"
                            style={{ fontSize: 12 }}
                        />
                        <Tooltip
                            contentStyle={{
                                backgroundColor: "#0b1220",
                                border: "1px solid #334155",
                                borderRadius: 8,
                                color: "#e2e8f0",
                                fontSize: 12,
                            }}
                            itemStyle={{ color: "#e2e8f0" }}
                            // Replace the default gray hover overlay with a subtle indigo tint to match the dashboard theme
                            cursor={{ fill: "rgba(99,102,241,0.08)" }}
                        />
                        <Bar dataKey="value" radius={[8, 8, 0, 0]}>
                            <LabelList
                                dataKey="value"
                                position="top"
                                style={{
                                    fill: "#e2e8f0",
                                    fontSize: 12,
                                    fontWeight: 700,
                                }}
                            />
                            {data.map((_, idx) => (
                                <Cell key={`cell-${idx}`} fill={colors[idx]} />
                            ))}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}
