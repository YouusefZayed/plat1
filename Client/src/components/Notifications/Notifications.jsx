import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import axios from 'axios';
import { MdNotificationsActive } from "react-icons/md";
import NotificationPopover from './NotificationPopover';

const socket = io('http://localhost:4001');

function Notifications() {
    const [notifications, setNotifications] = useState([]);
    const [showPopover, setShowPopover] = useState(false);

    useEffect(() => {
        // Fetch existing notifications
        axios.get('http://localhost:4001/api/notifications')
            .then(response => {
                setNotifications(response.data);
            })
            .catch(error => {
                console.error('Error fetching notifications:', error);
            });

        // Listen for new notifications
        socket.on('notification', notification => {
            setNotifications(prev => [...prev, notification]);
        });

        return () => {
            socket.off('notification');
        };
    }, []);

    const togglePopover = () => {
        setShowPopover(prev => !prev);
    };

    console.log("notifications: ", notifications);

    return (
        <div style={{ position: 'relative' }}>
            <MdNotificationsActive onClick={togglePopover} size={20} />
            {showPopover ? <NotificationPopover notifications={notifications} />
            : null}
        </div>
    );
}

export default Notifications;
