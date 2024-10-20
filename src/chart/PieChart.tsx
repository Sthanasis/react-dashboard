import { selectData } from '@/store/features/characters/charactersSlice';
import { useAppSelector } from '@/store/hooks';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { useMemo } from 'react';

const PieChart = () => {
  const disneyCharacters = useAppSelector(selectData);
  const pieChartData = useMemo(() => {
    const total = disneyCharacters.reduce(
      (total, character) => (total += character.films.length),
      0
    );
    return disneyCharacters.map((character) => ({
      y: character.films.length,
      name: character.name,
      custom: {
        films: character.films.join(', '),
        percentage: Math.round((character.films.length / total) * 100),
      },
    }));
  }, [disneyCharacters]);

  const options: Highcharts.Options = {
    title: {
      text: 'Disney Characters',
    },
    series: [
      {
        type: 'pie',
        data: pieChartData,
        tooltip: {
          pointFormat:
            '<strong>{point.custom.percentage}%</strong><br/>{point.custom.films}',
        },
      },
    ],
  };

  return (
    <HighchartsReact
      highcharts={Highcharts}
      options={options}
    />
  );
};

export default PieChart;
