import { React } from "react"
import Hero from '../components/hero/Hero'
import Presentation from '../components/modules/presentation/Presentation'
import Quality from '../components/modules/Quality/Qualilty'
import Products from '../components/modules/Products/Products';



function Home() {
  return (
    <div className="home">
      <Hero />
      <Presentation />
      <Quality />
      <Products />

    </div>
  );
}

export default Home
