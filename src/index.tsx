import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './App';
import { createServer, Model } from 'miragejs';

createServer({
  //"mirage" tem um banco de dados interno:

  models: {
    transactions: Model,
  },

  seeds(server) {
    server.db.loadData({
      transactions: [
        {
          id: 1,
          title: 'Freelance de Website',
          type: 'deposit',
          category: 'Dev',
          amount: 6000,
          createdAt: '04-03-2021',
        },
        {
          id: 2,
          title: 'Aluguel',
          type: 'withdraw',
          category: 'Casa',
          amount: 1100,
          createdAt: '04-03-2021',
        },
      ],
    })
  },


  routes() {
    this.namespace = 'api';

    this.get('/transactions', schema => {
      //console.log(schema)
      // @ts-ignore
      return schema.transactions.all(); // retornar todas as transações do bd
     })

     //dados enviados para "transactions" (json/javascript)
     this.post('/transactions', (schema, request) => {
       const data = JSON.parse(request.requestBody)
       return schema.create('transactions', data)
     } )
  }
})

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);