import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import { Task, TaskStatus } from '../models/Task';

interface BarGraphProps {
  tasks: Task[];
}

const BarGraph: React.FC<BarGraphProps> = ({ tasks }) => {
  const chartRef = useRef<HTMLCanvasElement | null>(null);
  const chartInstance = useRef<Chart | null>(null);

  useEffect(() => {
    if (chartRef.current) {
      if (chartInstance.current) {
        chartInstance.current.destroy(); // Destroy previous chart instance
      }
      const counts = {
        [TaskStatus.TODO]: 0,
        [TaskStatus.IN_PROGRESS]: 0,
        [TaskStatus.COMPLETED]: 0,
      };

      tasks.forEach((task) => {
        counts[task.status as TaskStatus]++;
      });

      const ctx = chartRef.current.getContext('2d');
      if (ctx) {
        chartInstance.current = new Chart(ctx, {
          type: 'bar',
          data: {
            labels: ["TODO", "IN_PROGRESS", "COMPLETED"],
            datasets: [
              {
                label: 'Tasks per Status',
                data: Object.values(counts),
                backgroundColor: [
                  'rgba(0, 0, 0, 1)',
                  'rgba(0, 0, 0, 1)',
                  'rgba(0, 0, 0, 1)',
                ],
                borderColor: [
                  'rgba(0, 0, 0, 1)',
                  'rgba(0, 0, 0, 1)',
                  'rgba(0, 0, 0, 1)',
                ],
                borderWidth: 1,
              },
            ],
          },
          options: {
            scales: {
              y: {
                beginAtZero: true,
              },
            },
          },
        });
      }
    }

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy(); // Cleanup on component unmount
      }
    };
  }, [tasks]);

  return <canvas ref={chartRef} />;
};

export default BarGraph;
