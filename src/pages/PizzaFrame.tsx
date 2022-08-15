import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Pizza from '../components/Pizza';
import Skeleton from '../components/Pizza/Skeleton';

import axios from 'axios';

const PizzaFrame: React.FC = () => {
  const [pizza, setPizza] = useState<{
    imageUrl: string;
    title: string;
    price: number;
    id: string;
    sizes: number[];
    types: number[];
  }>();
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPizza = async () => {
      try {
        const { data } = await axios.get(`https://62dfc893976ae7460bf39a43.mockapi.io/items/${id}`);
        setPizza(data.items);
      } catch (error) {
        alert('Ошибка при загрузке данных');
        console.error(error);
        navigate('/');
      }
    };

    fetchPizza();
  }, [id, navigate]);

  if (pizza) {
    return <Pizza {...pizza} isFrame />;
  } else {
    return <Skeleton />;
  }
};

export default PizzaFrame;
