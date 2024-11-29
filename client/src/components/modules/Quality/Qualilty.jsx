import React from 'react'
import './quality.scss'

const Qualilty = () => {
  return (
    <div className='quality'>
        <div className='quality__left'>
            <h2>Qualité garantie</h2>
            <p>Au gré des saisons vend des produits à base de plantes naturelles depuis 2022. </p>
            <p>                 Nous fournissons un excellent service client avec une équipe dirigée par le fondateur Vincent Cassagne, joignable par e-mail à vincent.cassagne@agredessaison.com ou par téléphone au +33 6 99 48 87 55.</p>

            <button className='garanty button-quality'>En savoir plus →</button>
        </div>
        <div className='quality__right' >
            <div className='quality__right__card'>
                <h2>Qualité <span>Produits naturels</span></h2>
                <p>Nos produits sont élaborés à partir d'ingrédients 100% naturels et de la plus haute qualité pour votre bien-être.
                </p>
            </div>
            <div className='quality__right__card'>
                <h2>Efficacité <span>Effets prouvés</span></h2>
                <p>Formulés par des herboristes expérimentés, la plupart de nos produits ont démontré cliniquement leur capacité à soulager divers troubles de santé.
                </p>
            </div>
            <div className='quality__right__card'>
                <h2>Origine <span>Production française</span></h2>
                <p>Nos herbes médicinales et préparations à base de plantes sont cultivées, récoltées et transformées en France dans le plus grand respect des cycles naturels.</p>
            </div>

            <div className='quality__right__card'>
                <h2>Conseils <span>Notre expertise à votre service</span></h2>
                <p>Pour toute question sur le choix ou l'utilisation de nos produits, nos herboristes qualifiés sont à votre disposition pour vous orienter vers les solutions les mieux adaptées.</p>
            </div>
        </div>

    </div>
  )
}

export default Qualilty