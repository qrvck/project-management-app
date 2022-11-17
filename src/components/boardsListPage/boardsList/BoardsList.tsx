import React from 'react';
import BoardCard from '../boardCard/BoardCard';
import styles from './BoardsList.module.scss';

const boards = [
  {
    _id: '1',
    title: 'rss Lang',
    owner: 'Vlad',
  },
  {
    _id: '2',
    title: 'async race',
    owner: 'Vlad',
  },
  {
    _id: '3',
    title: 'Online-Store',
    owner: 'Vlad',
  },

  {
    _id: '4',
    title: 'virtual keyboard',
    owner: 'Ira',
  },
  {
    _id: '5',
    title: 'shelter',
    owner: 'Anna',
  },
  {
    _id: '6',
    title: 'CSS Mem Slider',
    owner: 'Aliaksandr',
  },
];

function BoardsList() {
  return (
    <div className={styles.list}>
      {boards.map((board) => (
        <BoardCard key={board._id} to={board._id} title={board.title} owner={board.owner} />
      ))}
    </div>
  );
}

export default BoardsList;
