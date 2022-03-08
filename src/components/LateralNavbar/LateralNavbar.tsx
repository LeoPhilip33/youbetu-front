import './LateralNavbar.scss';
import logo_home from '../../img/home.png';
import logo_explorer from '../../img/explorer.png';
import logo_like from '../../img/like.png';
import logo_abonnement from '../../img/abonnement.png';

function LateralNavbar() {
    return (
        <div className='container-lateral-navbar'>
            <div className='lateral-navbar'>
                <div className='alignement-logo'>
                    <img src={logo_home} className="logo_lateral" alt="Home youbetu" />
                    <div> Accueil </div>
                </div>

                <div className='alignement-logo'>
                    <img src={logo_explorer} className="logo_lateral" alt="Explorer youbetu" />
                    <div> Explorer </div>
                </div>

                <div className='alignement-logo'>
                    <img src={logo_like} className="logo_lateral" alt="Like youbetu" />
                    <div> Vidéos "J'aime" </div>
                </div>

                <div className='alignement-logo'>
                    <img src={logo_abonnement} className="logo_lateral" alt="Like youbetu" />
                    <div> ABONNEMENTS </div>
                </div>
            </div>
        </div>
    );
}

export default LateralNavbar;
