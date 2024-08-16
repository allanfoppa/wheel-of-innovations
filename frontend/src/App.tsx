import { RouterProvider } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import { router } from './router/router';
import './App.css';

export default function App() {
  return (
    <section
      id="app"
      className="font-regular"
    >
      <ChakraProvider>
        <RouterProvider
          router={router}
          fallbackElement={<p>Loading...</p>}
        />
      </ChakraProvider>
    </section>
  );
}
