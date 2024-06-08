import { useEffect, useState } from 'react';
import { Bar,Pie } from 'react-chartjs-2';
import axios from 'axios';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const options = {
  indexAxis: 'x',
  elements: {
    bar: {
      borderWidth: 2,
    },
  },
  responsive: true,
  plugins: {
    legend: {
      position: 'right',
    },
    title: {
      display: true,
      text: 'Chart.js Vertical Bar Chart',
    },
  },
};

const VerticalChart = () => {
  const [data, setData] = useState({
    labels: ['Total', 'Maximal', 'Minimal'],
    datasets: [
      {
        label: 'Dataset 1',
        data: [],
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(25, 90, 13, 0.5)',
      },
    ],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const totalRes = await axios.get('http://localhost:4321/total');
        const maxRes = await axios.get('http://localhost:4321/maximal');
        const minRes = await axios.get('http://localhost:4321/minimal');

        // Affichez les données dans la console pour vérification
        console.log('Total Data:', totalRes.data);
        console.log('Max Data:', maxRes.data);
        console.log('Min Data:', minRes.data);

        // Utilisez les données de totalRes, maxRes et minRes pour mettre à jour les états ou effectuer d'autres traitements.

        // Exemple de mise à jour de l'état (à adapter en fonction de votre structure de données) :
        setData({
          labels: ['Total', 'Maximal', 'Minimal'],
          datasets: [
            {
              label: 'Dataset ID',
              data: [
                totalRes.data.map(item => item.total)[0],
                maxRes.data.map(item => item.max)[0],
                minRes.data.map(item => item.min)[0],
              ],
              borderColor: 'rgb(255, 99, 132)',
              // backgroundColor: 'rgba(99, 132, 0.5)', // Modifiez cette ligne
              backgroundColor: [
                'rgba(25,99,132,0.5)',
                'rgba(25,229,122,0.5)',
                'rgba(214,9,11,0.5)'
            ],
            },
          ],
        });
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
     {/* <div style={{ width: '100%', height: '50%' }}> */}
    <div className='style'>
      <Bar data={data} options={options} />
      {/* <Pie data={data} options={options} /> */}
    </div>
    </>
  );
};

export default VerticalChart;
