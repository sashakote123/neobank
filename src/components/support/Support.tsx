import './styles.css'

import img1 from './../../sources/images/support/email.svg'
import img2 from './../../sources/images/support/send.svg'
const Support = () => {
    return (
        <section className='support'>
            <h3 className="suppor__title">Support</h3>
            <h4 className="support__subtitle">Subscribe Newsletter & get</h4>
            <h4 className="support__subsubtitle">Bank News</h4>
            <form className='support__form' action="">
                <div className="form__input">
                    <img src={img1} alt="" />
                    <input placeholder='Your email' type="mail" />
                </div>

                <div className="form__button">
                    <img src={img2} alt="" />
                    <button>Subscribe</button>
                </div>

            </form>
        </section>
    );
}
export default Support;