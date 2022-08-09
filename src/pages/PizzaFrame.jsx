import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Pizza from '../components/Pizza';
import { Skeleton } from '../components/Pizza/Skeleton';

import axios from 'axios';

export default function PizzaFrame() {
  const [pizza, setPizza] = useState();
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
  }, [id]);

  if (pizza) {
    return <Pizza {...pizza} isFrame />;
  } else {
    return <Skeleton />;
  }
}
