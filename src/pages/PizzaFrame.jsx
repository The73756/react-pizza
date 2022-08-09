import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Skeleton } from '../components/Pizza/Skeleton';

import axios from 'axios';

export default function PizzaFrame() {
  const [pizza, setPizza] = useState();
  const { id } = useParams();

  useEffect(() => {
    const fetchPizza = async () => {
      try {
        const { data } = await axios.get(`https://62dfc893976ae7460bf39a43.mockapi.io/items/${id}`);
        setPizza(data.items);
      } catch (error) {
        alert('Ошибка при загрузке данных');
        console.error(error);
      }
    };

    fetchPizza();
  }, [id]);

  if (pizza) {
    return (
      <div>
        <img src={pizza.imageUrl} alt='' />
        <h2>{pizza.title}</h2>
        <p>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ipsa at aperiam illo! Earum
          voluptas corporis sunt! Nihil, exercitationem? Sed libero exercitationem esse voluptatum
          dignissimos molestias asperiores ab debitis itaque quod.
        </p>
        <h4>{pizza.price} ₽</h4>
      </div>
    );
  } else {
    return <Skeleton />;
  }
}
