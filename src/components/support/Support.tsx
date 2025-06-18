import './styles.css'

import emailImage from '@images/support/email.svg'
import sendBtnImage from '@images/support/send.svg'
const Support = () => {
    return (
        <section className='support'>
            <h3 className="suppor__title">Support</h3>
            <h4 className="support__subtitle">Subscribe Newsletter & get</h4>
            <h4 className="support__subsubtitle">Bank News</h4>
            <form className='support__form' action="">
                <div className="form__input">
                    <img src={emailImage} alt="inputImg" />
                    <input placeholder='Your email' type="mail" />
                </div>

                <div className="form__button">
                    <img src={sendBtnImage} alt="inputImg" />
                    <button>Subscribe</button>
                </div>

            </form>
        </section>
    );
}
export default Support;