import loader from './loader.svg'
import cl from './Loader.module.scss'

const Loader: React.FC = () =>{
    return(
        <div className={cl.wrapper}>
                <img src={loader} className={cl.img} alt="Loading" />
        </div>
    )
}

export default Loader;