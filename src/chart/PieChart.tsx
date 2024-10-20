import Button from '@/common/components/Button';
import { selectData } from '@/store/features/characters/charactersSlice';
import { useAppSelector } from '@/store/hooks';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { useMemo } from 'react';
import * as XLSX from 'xlsx';
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
        name: character.name,
        total: character.films.length,
        films: character.films.join(', '),
        percentage: Math.round((character.films.length / total) * 100),
      },
    }));
  }, [disneyCharacters]);

  const options: Highcharts.Options = {
    title: {
      text: 'Disney Characters',
    },
    accessibility: {
      enabled: true,
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

  function exportToExcel() {
    const data = pieChartData.map((data) => data.custom);
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Disney Characters');
    XLSX.writeFile(workbook, 'disney_characters.xlsx');
  }

  return (
    <>
      <HighchartsReact
        highcharts={Highcharts}
        options={options}
      />
      <Button
        variant="filled"
        color="primary"
        onClick={exportToExcel}
      >
        {'Export XLSX'}
      </Button>
    </>
  );
};

export default PieChart;
