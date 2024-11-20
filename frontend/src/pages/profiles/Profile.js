import React from 'react';
import styles from '../../styles/Profile.module.css';
import btnStyles from '../../styles/Button.module.css';
import { useCurrentUser } from '../../contexts/CurrentUserContext';
import Avatar from '../../components/Avatar';
import { Link } from "react-router-dom";
import { useSetProfileData } from '../../contexts/ProfileDataContext';

const Profile = (props) => {
    const { profile, mobile, imageSize = 55 } = props;
    const { id, following_id, images, owner } = profile;
    const currentUser = useCurrentUser();
    const is_owner = currentUser?.username === owner;

    const {handleFollow, handleUnfollow} = useSetProfileData();

    return (
        <div
            className={`my-3 d-flex align-items-center ${mobile && 'flex-column'}`}
        >
            <div>
                <Link className="align-self-center" to={`/profiles/${id}`}>
                    <Avatar src={images} height={imageSize} />
                </Link>
            </div>
            <div className={`mx-2 ${styles.WordBreak}`}>
                <strong>{owner}</strong>
            </div>
            <div className={`text-right ${!mobile && 'ml-auto'}`}>
                {!mobile && currentUser && !is_owner && (
                    following_id ? (
                        <button 
                            className={`${btnStyles.Button} ${btnStyles.BlackOutline}`}
                            onClick={()=>handleUnfollow(profile)}
                            >
                            unfollow
                        </button>
                    ) : (
                        <button
                            className={`${btnStyles.Button} ${btnStyles.Black}`}
                            onClick={()=>handleFollow(profile)}
                        >
                            follow
                        </button>
                    )
                )}
            </div>
        </div>
    )
}

export default Profile