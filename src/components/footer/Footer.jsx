import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import RoomIcon from "@mui/icons-material/Room";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import classes from "./Footer.module.css";

const links1 = [
  { title: "Home", url: "" },
  { title: "Men's Fashion", url: "" },
  { title: "Accessories", url: "" },
  { title: "Order Tracking", url: "" },
  { title: "Wishlist", url: "" },
];

const links2 = [
  { title: "Cart", url: "" },
  { title: "Women's Fashion", url: "" },
  { title: "My Account", url: "" },
  { title: "Terms", url: "" },
];

const Footer = () => {
  return (
    <div className={classes.container}>
      <div className={classes["footer-content"]}>
        <div>
          <h2>SHOP</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem
            ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
            tempor incididunt ut labore et dolore magna aliqua.
          </p>
          <div className={classes.socialmedia}>
            <span className={classes.fbicon}>
              <FacebookIcon />
            </span>
            <span className={classes.instaicon}>
              <InstagramIcon />
            </span>
            <span className={classes.twittericon}>
              <TwitterIcon />
            </span>
          </div>
        </div>
        <div>
          <h2>Useful Links</h2>
          <div className={classes.listcont}>
            <ul>
              {links1.map((item, i) => (
                <li key={item.title + i}>{item.title}</li>
              ))}
            </ul>
            <ul>
              {links2.map((item, i) => (
                <li key={item.title + i}>{item.title}</li>
              ))}
            </ul>
          </div>
        </div>
        <div className={classes.contactitems}>
          <h2>Contact</h2>
          <div>
            <RoomIcon /> <p>818 Malibu Town, Gurugram, India</p>
          </div>
          <div>
            <PhoneIcon /> <p>+1 234 567 89</p>
          </div>
          <div>
            <EmailIcon /> <p>akashsharma291295@gmail.com</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
