import { useState } from "react"
import { useAuth } from "../store/auth";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const defaultContactForm = {
    username: "",
    email: "",
    message: "",
};

export const Contact = () => {
    const [contact, setContact] = useState(defaultContactForm);

    const { user } = useAuth();

    const [userData, setUserData] = useState(true);


    if(userData && user) {
        setContact({
            username: user.username,
            email: user.email,
            message: "",
        })
        setUserData(false);
    }

    const handleInput = (e) => {
        console.log(e.target.value);
        const name = e.target.name;
        const value = e.target.value;

        setContact({
            ...contact,
            [name]: value,
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            const response = await fetch("http://localhost:5000/api/form/contact", {
               method: "POST",
               headers: {
                   "Content-Type": "application/json",
               } ,
               body: JSON.stringify(contact),
            });

            if(response.ok) {
                setContact(defaultContactForm);
                const data = await response.json();
                console.log(data);
                toast.success("Message sent successfully");
            }
            
        } catch (error) {
            toast.error("Message not sent");
            console.log(error);
        }
    }

    return (
        <>
            <section className="section-contact">
                <div className="contact-content container">
                    <h1 className="main-heading">contact us</h1>
                </div>

                {/* contact page main */}
                <div className="container grid grid-two-cols">
                    <div className="contact-img">
                        <img 
                        src="/images/support.png" 
                        alt="we are always ready to help" 
                        />
                    </div>

                    {/* contact form content actual */}
                    <section className="section-form">
                        <form onSubmit={handleSubmit}>
                            <div>
                                <label htmlFor="username">username</label>
                                <input 
                                type="text"
                                name="username"
                                id="username"
                                placeholder="username"
                                autoComplete="off"
                                value={contact.username}
                                onChange={handleInput}
                                required
                                 />
                            </div>
                            <div>
                                <label htmlFor="email">email</label>
                                <input 
                                type="email"
                                name="email"
                                id="email"
                                placeholder="email"
                                autoComplete="off"
                                value={contact.email}
                                onChange={handleInput}
                                required
                                 />
                            </div>
                            <div>
                                <label htmlFor="message">message</label>
                                <textarea 
                                    name="message" 
                                    id="message" 
                                    placeholder="Write your message here..."
                                    autoComplete="off" 
                                    value={contact.message} 
                                    onChange={handleInput} 
                                    required 
                                    cols="30" 
                                    rows="6">
                                </textarea>
                            </div>
                            <div>
                                <button type="submit">submit</button>
                            </div>
                        </form>
                    </section>
                </div>

                <section className="mb-3">
                    <iframe 
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3889.085937468926!2d77.51600707465869!3d12.902195416397!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae3fa7243af9c3%3A0x9bed6669a38d1c3!2sRNS%20INSTITUTE%20OF%20TECHNOLOGY!5e0!3m2!1sen!2sin!4v1715148458637!5m2!1sen!2sin" 
                    width="100%" 
                    height="450" 
                    allowfullscreen="" 
                    loading="lazy" 
                    referrerpolicy="no-referrer-when-downgrade"
                    ></iframe>
                </section>

            </section>
        </>
    )
}