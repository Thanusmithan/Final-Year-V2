// // Admin_Message.js --------Corrected-------------------------------------------------------------------------
// import React, { useState, useEffect } from 'react';
// import './Css/Message.css';
// import Header from './Componets/Admin_Header';
// import Footer from './Componets/Footer';
// import { FaBullhorn, FaPaperPlane, FaInbox, FaEdit, FaTrash } from "react-icons/fa";
// import Alert from 'react-bootstrap/Alert';

// const AdminMessagingPage = () => {
//   const [announcement, setAnnouncement] = useState('');
//   const [sentMessages, setSentMessages] = useState([]); // Initialize as an array
//   const [receivedMessages, setReceivedMessages] = useState([]); // Initialize as an array
//   const [users, setUsers] = useState([]); // List of users for the dropdown
//   const [recipient, setRecipient] = useState('');
//   const [messageContent, setMessageContent] = useState('');
//   const [editingMessage, setEditingMessage] = useState(null);
//   const [alert, setAlert] = useState({ show: false, message: '', type: '' });

//   const [refresh, setRefresh] = useState('');

//   // Fetch sent and received messages and user list on component load

//   // useEffect(()=>{},[])
//   useEffect(() => {
//     fetchMessages();
//     fetchReceivedMessages();
//     fetchUsers();
//   }, [refresh]);

//   const fetchMessages = async () => {
//     try {
//       const userId = JSON.parse(localStorage.getItem("user"))?._id;
//       const response = await fetch(`/api/messages/${userId}/sent`, {
//         headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
//       });
//       // const response = await fetch('/api/messages/sent'); // Replace with your backend route
//       const data = await response.json();
//       setSentMessages(Array.isArray(data) ? data : []); // Ensure the response is an array
//     } catch (error) {
//       console.error('Error fetching sent messages:', error);
//     }
//   };

//   const fetchReceivedMessages = async () => {
//     try {
//       const response = await fetch(`/api/messages/${JSON.parse(localStorage.getItem("user"))?._id}`); // Replace with your backend route
//       const data = await response.json();
//       setReceivedMessages(Array.isArray(data) ? data : []); // Ensure the response is an array
//     } catch (error) {
//       console.error('Error fetching received messages:', error);
//     }
//   };

//   const fetchUsers = async () => {
//     try {
//       const response = await fetch('/api/users', {
//         headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
//       });
//       const data = await response.json();
//       // Exclude admin-related names
//       const filteredUsers = data.filter((user) => user.role !== 'admin');
//       setUsers(filteredUsers);
//     } catch (error) {
//       console.error('Error fetching users:', error);
//     }
//   };

//   const handlePostAnnouncement = async () => {
//     if (!announcement) {
//       setAlert({ show: true, message: 'Please enter an announcement.', type: 'danger' });
//       return;
//     }

//     try {
//       const response = await fetch('/api/announcements', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           Authorization: `Bearer ${localStorage.getItem('token')}`, // Add token for authentication
//         },
//         body: JSON.stringify({
//           title: 'General Announcement', // Provide a default title or input from the user
//           content: announcement,
//         }),
//       });

//       if (!response.ok) {
//         const errorData = await response.json();
//         setAlert({
//           show: true,
//           message: errorData.error || 'Error creating announcement.',
//           type: 'danger',
//         });
//         return;
//       }

//       setAnnouncement('');
//       setAlert({ show: true, message: 'Announcement posted successfully!', type: 'success' });
//     } catch (error) {
//       console.error('Error posting announcement:', error.message);
//       setAlert({ show: true, message: 'Error creating announcement.', type: 'danger' });
//     }
//   };

//   const handleSendMessage = async () => {
//     if (!recipient || !messageContent) {
//       setAlert({ show: true, message: 'Please select a recipient and enter a message.', type: 'danger' });
//       return;
//     }

//     try {
//       if (editingMessage) {
//         const response = await fetch(`/api/messages/${editingMessage.id}`, {
//           method: 'PUT',
//           headers: {
//             'Content-Type': 'application/json',
//             Authorization: `Bearer ${localStorage.getItem('token')}`,
//           },
//           body: JSON.stringify({ content: messageContent }),
//         });
//         if (response.ok) {
//           setEditingMessage(null);
//           setAlert({ show: true, message: 'Message updated successfully!', type: 'success' });
//         } else {
//           setAlert({ show: true, message: 'Error updating message.', type: 'danger' });
//         }
//       } else {
//         const adminData = JSON.parse(localStorage.getItem("user"))
//         const response = await fetch('/api/messages', {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//             Authorization: `Bearer ${localStorage.getItem('token')}`,
//           },
//           body: JSON.stringify({ receiverId:recipient, senderId:adminData?._id,  content: messageContent }),
//         });
//         if (response.ok) {
//           setAlert({ show: true, message: 'Message sent successfully!', type: 'success' });
//         } else {
//           setAlert({ show: true, message: 'Error sending message.', type: 'danger' });
//         }
//       }
//       fetchMessages();
//     } catch (error) {
//       setAlert({ show: true, message: 'Error sending message.', type: 'danger' });
//       console.error('Error sending message:', error);
//     }

//     setRecipient('');
//     setMessageContent('');
//   };

//   const handleEditMessage = (message) => {
//     setEditingMessage(message);
//     setRecipient(message.recipient);
//     setMessageContent(message.content);
//   };

//   const handleDeleteMessage = async (id, isSent) => {
//     try {
//       const response = await fetch(`/api/messages/${id}`, {
//         method: 'DELETE',
//         headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
//       });
//       if (response.ok) {
//         if (isSent) {
//           setSentMessages(sentMessages.filter((msg) => msg.id !== id));
//         } else {
//           setReceivedMessages(receivedMessages.filter((msg) => msg.id !== id));
//         }
//         setAlert({ show: true, message: 'Message deleted successfully!', type: 'success' });
//         setRefresh(Date.now())
//       } else {
//         setAlert({ show: true, message: 'Error deleting message.', type: 'danger' });
//       }
//     } catch (error) {
//       console.error('Error deleting message:', error);
//       setAlert({ show: true, message: 'Error deleting message.', type: 'danger' });
//     }
//   };

//   const handleCloseAlert = () => {
//     setAlert({ show: false, message: '', type: '' });
//   };

//   return (
//     <>
//       <Header />
//       <div className="container my-5 admin-message-container">
//         <h2 className="text-center my-3">Admin Messaging & Announcements</h2>
//         {alert.show && (
//           <Alert
//             variant={alert.type}
//             onClose={handleCloseAlert}
//             dismissible
//             className="admin-message-alert"
//           >
//             <strong>{alert.message}</strong>
//           </Alert>
//         )}

//         <div className="announcement-section mt-4 p-4 rounded shadow">
//           <h4><FaBullhorn className="me-2" />Post Announcement</h4>
//           <textarea
//             className="form-control mt-3"
//             value={announcement}
//             onChange={(e) => setAnnouncement(e.target.value)}
//             placeholder="Enter announcement here..."
//           ></textarea>
//           <button className="btn btn-primary mt-3" onClick={handlePostAnnouncement}>
//             Post Announcement
//           </button>
//         </div>

//          {/* Display sections for sent Announcement */}
//          <div className="messages-display mt-5 p-4 rounded shadow">
//           <h4><FaInbox className="me-2" />Sent Announcements</h4>
//           {Array.isArray(sentMessages) && sentMessages.length > 0 ? (
//             <ul className="list-group">
//               {sentMessages.map((msg) => (
//                 <li
//                   key={msg.id || msg._id}
//                   className="message-list-group-item d-flex justify-content-between align-items-center"
//                 >
//                   <span>To: {msg.receiverId?.lastName} - {msg.content}</span>
//                   <div>
//                     <FaEdit className="text-primary me-2" onClick={() => handleEditMessage(msg)} />
//                     <FaTrash className="text-danger" onClick={() => handleDeleteMessage(msg.id || msg._id, true)} />
//                   </div>
//                 </li>
//               ))}
//             </ul>
//           ) : (
//             <p>No sent Announcement to display.</p>
//           )}
//         </div>

//         {/* Sent message section */}
//         <div className="messaging-section mt-5 p-4 rounded shadow">
//           <h4><FaPaperPlane className="me-2" />{editingMessage ? 'Edit Message' : 'Message Patients'}</h4>
//           <select
//             className="form-control mt-3"
//             value={recipient}
//             onChange={(e) => setRecipient(e.target.value)}
//           >
//             <option value="">Select a patient</option>
//             {users.map((user) => (
//               <option key={user.id || user._id} value={user.id || user._id}>
//                 {user.firstName} {user.lastName} {" - " + user?.email}
//               </option>
//             ))}
//           </select>
//           <textarea
//             className="form-control mt-3"
//             value={messageContent}
//             onChange={(e) => setMessageContent(e.target.value)}
//             placeholder="Enter message here..."
//           ></textarea>
//           <button className="btn btn-success mt-3" onClick={handleSendMessage}>
//             <FaPaperPlane className="me-2" /> {editingMessage ? 'Update Message' : 'Send Message'}
//           </button>
//         </div>

//         {/* Display sections for sent and received messages */}
//         <div className="messages-display mt-5 p-4 rounded shadow">
//           <h4><FaInbox className="me-2" />Sent Messages</h4>
//           {Array.isArray(sentMessages) && sentMessages.length > 0 ? (
//             <ul className="list-group">
//               {sentMessages.map((msg) => (
//                 <li
//                   key={msg.id || msg._id}
//                   className="message-list-group-item d-flex justify-content-between align-items-center"
//                 >
//                   <span>To: {msg.receiverId?.lastName} - {msg.content}</span>
//                   <div>
//                     <FaEdit className="text-primary me-2" onClick={() => handleEditMessage(msg)} />
//                     <FaTrash className="text-danger" onClick={() => handleDeleteMessage(msg.id || msg._id, true)} />
//                   </div>
//                 </li>
//               ))}
//             </ul>
//           ) : (
//             <p>No sent messages to display.</p>
//           )}
//         </div>
//         <div className="messages-display mt-5 p-4 rounded shadow">
//           <h4><FaInbox className="me-2" />Received Messages from Patients</h4>
//           {Array.isArray(receivedMessages) && receivedMessages.length > 0 ? (
//             <ul className="list-group">
//               {receivedMessages.map((msg) => (
//                 <li
//                   key={msg.id || msg._id}
//                   className="message-list-group-item d-flex justify-content-between align-items-center"
//                 >
//                   <span>From : {msg.senderId?.lastName} - {msg.content}</span>
//                   <FaTrash className="text-danger" onClick={() => handleDeleteMessage(msg.id || msg._id, false)} />
//                 </li>
//               ))}
//             </ul>
//           ) : (
//             <p>No received messages to display.</p>
//           )}
//         </div>
//       </div>
//       <Footer />
//     </>
//   );
// };

// export default AdminMessagingPage;





// //Admin_Message.js
// import React, { useState, useEffect } from 'react';
// import './Css/Message.css';
// import Header from './Componets/Admin_Header';
// import Footer from './Componets/Footer';
// import Badge from 'react-bootstrap/Badge';
// import { FaBullhorn, FaPaperPlane, FaInbox, FaEdit, FaTrash } from "react-icons/fa";
// import Alert from 'react-bootstrap/Alert';

// // Helper function to format date and time
// const formatDateTime = (dateTime) => {
//   const date = new Date(dateTime);
//   const options = { hour: '2-digit', minute: '2-digit', hour12: true };
//   return `${date.toLocaleDateString()} ${date.toLocaleTimeString([], options)}`;
// };

// const AdminMessagingPage = () => {
//   const [announcement, setAnnouncement] = useState('');
//   const [sentMessages, setSentMessages] = useState([]);
//   const [receivedMessages, setReceivedMessages] = useState([]);
//   const [users, setUsers] = useState([]);
//   const [recipient, setRecipient] = useState('');
//   const [messageContent, setMessageContent] = useState('');
//   const [editingMessage, setEditingMessage] = useState(null);
//   const [editingAnnouncement, setEditingAnnouncement] = useState(null);
//   const [sentAnnouncements, setSentAnnouncements] = useState([]);
//   const [alert, setAlert] = useState({ show: false, message: '', type: '' });
//   const [refresh, setRefresh] = useState('');

//   useEffect(() => {
//     fetchMessages();
//     fetchReceivedMessages();
//     fetchUsers();
//     fetchAnnouncements();
//   }, [refresh]);

//   const fetchMessages = async () => {
//     try {
//       const userId = JSON.parse(localStorage.getItem("user"))?._id;
//       const response = await fetch(`/api/messages/${userId}/sent`, {
//         headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
//       });
//       const data = await response.json();
//       setSentMessages(Array.isArray(data) ? data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)) : []);
//     } catch (error) {
//       console.error('Error fetching sent messages:', error);
//     }
//   };

//   const fetchReceivedMessages = async () => {
//     try {
//       const userId = JSON.parse(localStorage.getItem("user"))?._id;
//       const response = await fetch(`/api/messages/${userId}`, {
//         headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
//       });
//       const data = await response.json();
//       setReceivedMessages(Array.isArray(data) ? data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)) : []);
//     } catch (error) {
//       console.error('Error fetching received messages:', error);
//     }
//   };

//   const fetchUsers = async () => {
//     try {
//       const response = await fetch('/api/users', {
//         headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
//       });
//       const data = await response.json();
//       const filteredUsers = data.filter((user) => user.role !== 'admin');
//       setUsers(filteredUsers);
//     } catch (error) {
//       console.error('Error fetching users:', error);
//     }
//   };

//   const fetchAnnouncements = async () => {
//     try {
//       const response = await fetch('/api/announcements', {
//         headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
//       });
//       const data = await response.json();
//       setSentAnnouncements(Array.isArray(data) ? data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)) : []);
//     } catch (error) {
//       console.error('Error fetching announcements:', error);
//     }
//   };

//   const handlePostAnnouncement = async () => {
//     if (!announcement) {
//       setAlert({ show: true, message: 'Please enter an announcement.', type: 'danger' });
//       return;
//     }

//     try {
//       const method = editingAnnouncement ? 'PUT' : 'POST';
//       const url = editingAnnouncement
//         ? `/api/announcements/${editingAnnouncement._id}`
//         : '/api/announcements';

//       const response = await fetch(url, {
//         method,
//         headers: {
//           'Content-Type': 'application/json',
//           Authorization: `Bearer ${localStorage.getItem('token')}`,
//         },
//         body: JSON.stringify({
//           title: 'General Announcement',
//           content: announcement,
//         }),
//       });

//       if (!response.ok) {
//         const errorData = await response.json();
//         setAlert({
//           show: true,
//           message: errorData.error || 'Error posting announcement.',
//           type: 'danger',
//         });
//         return;
//       }

//       setAnnouncement('');
//       setEditingAnnouncement(null);
//       setAlert({ show: true, message: 'Announcement saved successfully!', type: 'success' });
//       setRefresh(Date.now());
//     } catch (error) {
//       console.error('Error posting announcement:', error.message);
//       setAlert({ show: true, message: 'Error posting announcement.', type: 'danger' });
//     }
//   };

//   const handleSendMessage = async () => {
//     if (!recipient || !messageContent) {
//       setAlert({ show: true, message: 'Please select a recipient and enter a message.', type: 'danger' });
//       return;
//     }

//     try {
//       const method = editingMessage ? 'PUT' : 'POST';
//       const url = editingMessage
//         ? `/api/messages/${editingMessage._id}`
//         : '/api/messages';

//       const adminData = JSON.parse(localStorage.getItem("user"));
//       const body = editingMessage
//         ? { content: messageContent }
//         : { receiverId: recipient, senderId: adminData?._id, content: messageContent };

//       const response = await fetch(url, {
//         method,
//         headers: {
//           'Content-Type': 'application/json',
//           Authorization: `Bearer ${localStorage.getItem('token')}`,
//         },
//         body: JSON.stringify(body),
//       });

//       if (!response.ok) {
//         setAlert({ show: true, message: 'Error saving message.', type: 'danger' });
//         return;
//       }

//       setMessageContent('');
//       setRecipient('');
//       setEditingMessage(null);
//       setAlert({ show: true, message: 'Message saved successfully!', type: 'success' });
//       setRefresh(Date.now());
//     } catch (error) {
//       console.error('Error saving message:', error);
//       setAlert({ show: true, message: 'Error saving message.', type: 'danger' });
//     }
//   };

//   const handleEditMessage = (message) => {
//     setEditingMessage(message);
//     setRecipient(message.receiverId?._id || '');
//     setMessageContent(message.content || '');
//   };

//   const handleEditAnnouncement = (announcement) => {
//     setEditingAnnouncement(announcement);
//     setAnnouncement(announcement.content);
//   };

//   const handleDeleteMessage = async (id, isSent) => {
//     try {
//       const response = await fetch(`/api/messages/${id}`, {
//         method: 'DELETE',
//         headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
//       });

//       if (!response.ok) {
//         setAlert({ show: true, message: 'Error deleting message.', type: 'danger' });
//         return;
//       }

//       if (isSent) {
//         setSentMessages(sentMessages.filter((msg) => msg._id !== id));
//       } else {
//         setReceivedMessages(receivedMessages.filter((msg) => msg._id !== id));
//       }

//       setAlert({ show: true, message: 'Message deleted successfully!', type: 'success' });
//     } catch (error) {
//       console.error('Error deleting message:', error);
//       setAlert({ show: true, message: 'Error deleting message.', type: 'danger' });
//     }
//   };

//   const handleDeleteAnnouncement = async (id) => {
//     try {
//       const response = await fetch(`/api/announcements/${id}`, {
//         method: 'DELETE',
//         headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
//       });

//       if (!response.ok) {
//         setAlert({ show: true, message: 'Error deleting announcement.', type: 'danger' });
//         return;
//       }

//       setSentAnnouncements(sentAnnouncements.filter((announcement) => announcement._id !== id));
//       setAlert({ show: true, message: 'Announcement deleted successfully!', type: 'success' });
//     } catch (error) {
//       console.error('Error deleting announcement:', error);
//       setAlert({ show: true, message: 'Error deleting announcement.', type: 'danger' });
//     }
//   };

//   const handleCloseAlert = () => {
//     setAlert({ show: false, message: '', type: '' });
//   };

//   return (
//     <>
//       <Header />
//       <div className="container my-5 admin-message-container">
//         <h2 className="text-center my-3">Admin Messaging & Announcements</h2>
//         {alert.show && (
//           <Alert
//             variant={alert.type}
//             onClose={handleCloseAlert}
//             dismissible
//             className="admin-message-alert"
//           >
//             <strong>{alert.message}</strong>
//           </Alert>
//         )}

//         <div className="announcement-section mt-4 p-4 rounded shadow">
//           <h4><FaBullhorn className="me-2" />Post Announcement</h4>
//           <textarea
//             className="form-control mt-3"
//             value={announcement}
//             onChange={(e) => setAnnouncement(e.target.value)}
//             placeholder="Enter announcement here..."
//           ></textarea>
//           <button className="btn btn-primary mt-3" onClick={handlePostAnnouncement}>
//             {editingAnnouncement ? 'Update Announcement' : 'Post Announcement'}
//           </button>
//         </div>

//         <div className="messages-display mt-5 p-4 rounded shadow">
//           <h4><FaInbox className="me-2" />Sent Announcements</h4>
//           {Array.isArray(sentAnnouncements) && sentAnnouncements.length > 0 ? (
//             <ul className="list-group">
//               {sentAnnouncements.map((announcement) => (
//                 <li
//                   key={announcement._id}
//                   className="message-list-group-item d-flex justify-content-between align-items-center mb-2"
//                 >
//                   <span>{announcement.content} <br /><small>{formatDateTime(announcement.createdAt)}</small></span>
//                   <div>
//                     <FaEdit
//                       className="text-primary me-2"
//                       onClick={() => handleEditAnnouncement(announcement)}
//                     />
//                     <FaTrash
//                       className="text-danger"
//                       onClick={() => handleDeleteAnnouncement(announcement._id)}
//                     />
//                   </div>
//                 </li>
//               ))}
//             </ul>
//           ) : (
//             <p>No sent announcements to display.</p>
//           )}
//         </div>

//         <div className="messaging-section mt-5 p-4 rounded shadow">
//           <h4><FaPaperPlane className="me-2" />Message Patients</h4>
//           <select
//             className="form-control mt-3"
//             value={recipient}
//             onChange={(e) => setRecipient(e.target.value)}
//           >
//             <option value="">Select a patient</option>
//             {users.map((user) => (
//               <option key={user._id} value={user._id}>
//                 {user.firstName} {user.lastName} {" - " + user.email}
//               </option>
//             ))}
//           </select>
//           <textarea
//             className="form-control mt-3"
//             value={messageContent}
//             onChange={(e) => setMessageContent(e.target.value)}
//             placeholder="Enter message here..."
//           ></textarea>
//           <button className="btn btn-success mt-3" onClick={handleSendMessage}>
//             {editingMessage ? 'Update Message' : 'Send Message'}
//           </button>
//         </div>

//         <div className="messages-display mt-5 p-4 rounded shadow">
//           <h4><FaInbox className="me-2" />Sent Messages</h4>
//           {Array.isArray(sentMessages) && sentMessages.length > 0 ? (
//             <ul className="list-group">
//               {sentMessages.map((msg) => (
//                 <li
//                   key={msg._id}
//                   className="message-list-group-item d-flex justify-content-between align-items-center mb-2"
//                 >
//                   <span>To: {msg.receiverId?.lastName} - {msg.content} <br /><small>{formatDateTime(msg.createdAt)}</small></span>
//                   <div>
//                     <FaEdit className="text-primary me-2" onClick={() => handleEditMessage(msg)} />
//                     <FaTrash
//                       className="text-danger"
//                       onClick={() => handleDeleteMessage(msg._id, true)}
//                     />
//                   </div>
//                 </li>
//               ))}
//             </ul>
//           ) : (
//             <p>No sent messages to display.</p>
//           )}
//         </div>

//         <div className="messages-display mt-5 p-4 rounded shadow">
//           <h4><FaInbox className="me-2" />Received Messages from Patients</h4>
//           {Array.isArray(receivedMessages) && receivedMessages.length > 0 ? (
//             <ul className="list-group">
//               {receivedMessages.map((msg) => (
//                 <li
//                   key={msg._id}
//                   className="message-list-group-item d-flex justify-content-between align-items-center mb-2"
//                 >
//                   <span>From: {msg.senderId?.lastName || 'Unknown'} - {msg.content} <br /><small>{formatDateTime(msg.createdAt)}</small></span>
//                   <FaTrash
//                     className="text-danger"
//                     onClick={() => handleDeleteMessage(msg._id, false)}
//                   />
//                 </li>
//               ))}
//             </ul>
//           ) : (
//             <p>No received messages to display.</p>
//           )}
//         </div>
//       </div>
//       <Footer />
//     </>
//   );
// };

// export default AdminMessagingPage;




// //Admin_Message.js
// import React, { useState, useEffect } from 'react';
// import './Css/Message.css';
// import Header from './Componets/Admin_Header';
// import Footer from './Componets/Footer';
// import Badge from 'react-bootstrap/Badge';
// import { FaBullhorn, FaPaperPlane, FaInbox, FaEdit, FaTrash } from "react-icons/fa";
// import Alert from 'react-bootstrap/Alert';

// // Helper function to format date and time
// const formatDateTime = (dateTime) => {
//   const date = new Date(dateTime);
//   const options = { hour: '2-digit', minute: '2-digit', hour12: true };
//   return `${date.toLocaleDateString()} ${date.toLocaleTimeString([], options)}`;
// };

// const AdminMessagingPage = () => {
//   const [announcement, setAnnouncement] = useState('');
//   const [sentMessages, setSentMessages] = useState([]);
//   const [receivedMessages, setReceivedMessages] = useState([]);
//   const [users, setUsers] = useState([]);
//   const [recipient, setRecipient] = useState('');
//   const [messageContent, setMessageContent] = useState('');
//   const [editingMessage, setEditingMessage] = useState(null);
//   const [editingAnnouncement, setEditingAnnouncement] = useState(null);
//   const [sentAnnouncements, setSentAnnouncements] = useState([]);
//   const [alert, setAlert] = useState({ show: false, message: '', type: '' });
//   const [refresh, setRefresh] = useState('');

//   useEffect(() => {
//     fetchMessages();
//     fetchReceivedMessages();
//     fetchUsers();
//     fetchAnnouncements();
//   }, [refresh]);

//   const fetchMessages = async () => {
//     try {
//       const userId = JSON.parse(localStorage.getItem("user"))?._id;
//       const response = await fetch(`/api/messages/${userId}/sent`, {
//         headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
//       });
//       const data = await response.json();
//       setSentMessages(Array.isArray(data) ? data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)) : []);
//     } catch (error) {
//       console.error('Error fetching sent messages:', error);
//     }
//   };

//   const fetchReceivedMessages = async () => {
//     try {
//       const userId = JSON.parse(localStorage.getItem("user"))?._id;
//       const response = await fetch(`/api/messages/${userId}`, {
//         headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
//       });
//       const data = await response.json();
//       setReceivedMessages(Array.isArray(data) ? data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)) : []);
//     } catch (error) {
//       console.error('Error fetching received messages:', error);
//     }
//   };

//   const fetchUsers = async () => {
//     try {
//       const response = await fetch('/api/users', {
//         headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
//       });
//       const data = await response.json();
//       const filteredUsers = data.filter((user) => user.role !== 'admin');
//       setUsers(filteredUsers);
//     } catch (error) {
//       console.error('Error fetching users:', error);
//     }
//   };

//   const fetchAnnouncements = async () => {
//     try {
//       const response = await fetch('/api/announcements', {
//         headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
//       });
//       const data = await response.json();
//       setSentAnnouncements(Array.isArray(data) ? data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)) : []);
//     } catch (error) {
//       console.error('Error fetching announcements:', error);
//     }
//   };

//   const handlePostAnnouncement = async () => {
//     if (!announcement) {
//       setAlert({ show: true, message: 'Please enter an announcement.', type: 'danger' });
//       return;
//     }

//     try {
//       const method = editingAnnouncement ? 'PUT' : 'POST';
//       const url = editingAnnouncement
//         ? `/api/announcements/${editingAnnouncement._id}`
//         : '/api/announcements';

//       const response = await fetch(url, {
//         method,
//         headers: {
//           'Content-Type': 'application/json',
//           Authorization: `Bearer ${localStorage.getItem('token')}`,
//         },
//         body: JSON.stringify({
//           title: 'General Announcement',
//           content: announcement,
//         }),
//       });

//       if (!response.ok) {
//         const errorData = await response.json();
//         setAlert({
//           show: true,
//           message: errorData.error || 'Error posting announcement.',
//           type: 'danger',
//         });
//         return;
//       }

//       setAnnouncement('');
//       setEditingAnnouncement(null);
//       setAlert({ show: true, message: 'Announcement saved successfully!', type: 'success' });
//       setRefresh(Date.now());
//     } catch (error) {
//       console.error('Error posting announcement:', error.message);
//       setAlert({ show: true, message: 'Error posting announcement.', type: 'danger' });
//     }
//   };

//   const handleSendMessage = async () => {
//     if (!recipient || !messageContent) {
//       setAlert({ show: true, message: 'Please select a recipient and enter a message.', type: 'danger' });
//       return;
//     }

//     try {
//       const method = editingMessage ? 'PUT' : 'POST';
//       const url = editingMessage
//         ? `/api/messages/${editingMessage._id}`
//         : '/api/messages';

//       const adminData = JSON.parse(localStorage.getItem("user"));
//       const body = editingMessage
//         ? { content: messageContent }
//         : { receiverId: recipient, senderId: adminData?._id, content: messageContent };

//       const response = await fetch(url, {
//         method,
//         headers: {
//           'Content-Type': 'application/json',
//           Authorization: `Bearer ${localStorage.getItem('token')}`,
//         },
//         body: JSON.stringify(body),
//       });

//       if (!response.ok) {
//         setAlert({ show: true, message: 'Error saving message.', type: 'danger' });
//         return;
//       }

//       setMessageContent('');
//       setRecipient('');
//       setEditingMessage(null);
//       setAlert({ show: true, message: 'Message saved successfully!', type: 'success' });
//       setRefresh(Date.now());
//     } catch (error) {
//       console.error('Error saving message:', error);
//       setAlert({ show: true, message: 'Error saving message.', type: 'danger' });
//     }
//   };

//   const handleEditMessage = (message) => {
//     setEditingMessage(message);
//     setRecipient(message.receiverId?._id || '');
//     setMessageContent(message.content || '');
//   };

//   const handleEditAnnouncement = (announcement) => {
//     setEditingAnnouncement(announcement);
//     setAnnouncement(announcement.content);
//   };

//   const handleDeleteMessage = async (id, isSent) => {
//     try {
//       const response = await fetch(`/api/messages/${id}`, {
//         method: 'DELETE',
//         headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
//       });

//       if (!response.ok) {
//         setAlert({ show: true, message: 'Error deleting message.', type: 'danger' });
//         return;
//       }

//       if (isSent) {
//         setSentMessages(sentMessages.filter((msg) => msg._id !== id));
//       } else {
//         setReceivedMessages(receivedMessages.filter((msg) => msg._id !== id));
//       }

//       setAlert({ show: true, message: 'Message deleted successfully!', type: 'success' });
//     } catch (error) {
//       console.error('Error deleting message:', error);
//       setAlert({ show: true, message: 'Error deleting message.', type: 'danger' });
//     }
//   };

//   const handleDeleteAnnouncement = async (id) => {
//     try {
//       const response = await fetch(`/api/announcements/${id}`, {
//         method: 'DELETE',
//         headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
//       });

//       if (!response.ok) {
//         setAlert({ show: true, message: 'Error deleting announcement.', type: 'danger' });
//         return;
//       }

//       setSentAnnouncements(sentAnnouncements.filter((announcement) => announcement._id !== id));
//       setAlert({ show: true, message: 'Announcement deleted successfully!', type: 'success' });
//     } catch (error) {
//       console.error('Error deleting announcement:', error);
//       setAlert({ show: true, message: 'Error deleting announcement.', type: 'danger' });
//     }
//   };

//   const handleCloseAlert = () => {
//     setAlert({ show: false, message: '', type: '' });
//   };

//   return (
//     <>
//       <Header />
//       <div className="container my-5 admin-message-container">
//         <h2 className="text-center my-3">Admin Messaging & Announcements</h2>
//         {alert.show && (
//           <Alert
//             variant={alert.type}
//             onClose={handleCloseAlert}
//             dismissible
//             className="admin-message-alert"
//           >
//             <strong>{alert.message}</strong>
//           </Alert>
//         )}


// <div className="filter-section mb-4">
//           <label htmlFor="filterDate" className="form-label">
//           <Badge bg="primary">Filter</Badge>
//           </label>
//           <input
//             type="date"
//             id="filterDate"
//             placeholder='Filter by Date:'
//             className="form-control"
//             value={filterDate}
//             onChange={(e) => setFilterDate(e.target.value)}
//             style={{width:'45px'}}
//           />
//         </div> 

//         <div className="announcement-section mt-4 p-4 rounded shadow">
//           <h4><FaBullhorn className="me-2" />Post Announcement</h4>
//           <textarea
//             className="form-control mt-3"
//             value={announcement}
//             onChange={(e) => setAnnouncement(e.target.value)}
//             placeholder="Enter announcement here..."
//           ></textarea>
//           <button className="btn btn-primary mt-3" onClick={handlePostAnnouncement}>
//             {editingAnnouncement ? 'Update Announcement' : 'Post Announcement'}
//           </button>
//         </div>

//         <div className="messages-display mt-5 p-4 rounded shadow">
//           <h4><FaInbox className="me-2" />Sent Announcements</h4>
//           {Array.isArray(sentAnnouncements) && sentAnnouncements.length > 0 ? (
//             <ul className="list-group">
//               {sentAnnouncements.map((announcement) => (
//                 <li
//                   key={announcement._id}
//                   className="message-list-group-item d-flex justify-content-between align-items-center mb-2"
//                 >
//                   <span>{announcement.content} <br /><small>{formatDateTime(announcement.createdAt)}</small></span>
//                   <div>
//                     <FaEdit
//                       className="text-primary me-2"
//                       onClick={() => handleEditAnnouncement(announcement)}
//                     />
//                     <FaTrash
//                       className="text-danger"
//                       onClick={() => handleDeleteAnnouncement(announcement._id)}
//                     />
//                   </div>
//                 </li>
//               ))}
//             </ul>
//           ) : (
//             <p>No sent announcements to display.</p>
//           )}
//         </div>

//         <div className="messaging-section mt-5 p-4 rounded shadow">
//           <h4><FaPaperPlane className="me-2" />Message Patients</h4>
//           <select
//             className="form-control mt-3"
//             value={recipient}
//             onChange={(e) => setRecipient(e.target.value)}
//           >
//             <option value="">Select a patient</option>
//             {users.map((user) => (
//               <option key={user._id} value={user._id}>
//                 {user.firstName} {user.lastName} {" - " + user.email}
//               </option>
//             ))}
//           </select>
//           <textarea
//             className="form-control mt-3"
//             value={messageContent}
//             onChange={(e) => setMessageContent(e.target.value)}
//             placeholder="Enter message here..."
//           ></textarea>
//           <button className="btn btn-success mt-3" onClick={handleSendMessage}>
//             {editingMessage ? 'Update Message' : 'Send Message'}
//           </button>
//         </div>

//         <div className="messages-display mt-5 p-4 rounded shadow">
//           <h4><FaInbox className="me-2" />Sent Messages</h4>
//           {Array.isArray(sentMessages) && sentMessages.length > 0 ? (
//             <ul className="list-group">
//               {sentMessages.map((msg) => (
//                 <li
//                   key={msg._id}
//                   className="message-list-group-item d-flex justify-content-between align-items-center mb-2"
//                 >
//                   <span>To: {msg.receiverId?.lastName} - {msg.content} <br /><small>{formatDateTime(msg.createdAt)}</small></span>
//                   <div>
//                     <FaEdit className="text-primary me-2" onClick={() => handleEditMessage(msg)} />
//                     <FaTrash
//                       className="text-danger"
//                       onClick={() => handleDeleteMessage(msg._id, true)}
//                     />
//                   </div>
//                 </li>
//               ))}
//             </ul>
//           ) : (
//             <p>No sent messages to display.</p>
//           )}
//         </div>

//         <div className="messages-display mt-5 p-4 rounded shadow">
//           <h4><FaInbox className="me-2" />Received Messages from Patients</h4>
//           {Array.isArray(receivedMessages) && receivedMessages.length > 0 ? (
//             <ul className="list-group">
//               {receivedMessages.map((msg) => (
//                 <li
//                   key={msg._id}
//                   className="message-list-group-item d-flex justify-content-between align-items-center mb-2"
//                 >
//                   <span>From: {msg.senderId?.lastName || 'Unknown'} - {msg.content} <br /><small>{formatDateTime(msg.createdAt)}</small></span>
//                   <FaTrash
//                     className="text-danger"
//                     onClick={() => handleDeleteMessage(msg._id, false)}
//                   />
//                 </li>
//               ))}
//             </ul>
//           ) : (
//             <p>No received messages to display.</p>
//           )}
//         </div>
//       </div>
//       <Footer />
//     </>
//   );
// };

// export default AdminMessagingPage;


import React, { useState, useEffect } from 'react';
import './Css/Message.css';
import Header from './Componets/Admin_Header';
import Footer from './Componets/Footer';
import Badge from 'react-bootstrap/Badge';
import { FaBullhorn, FaPaperPlane, FaInbox, FaEdit, FaTrash } from "react-icons/fa";
import Alert from 'react-bootstrap/Alert';

// Helper function to format date and time
const formatDateTime = (dateTime) => {
  const date = new Date(dateTime);
  const options = { hour: '2-digit', minute: '2-digit', hour12: true };
  return `${date.toLocaleDateString()} ${date.toLocaleTimeString([], options)}`;
};

const AdminMessagingPage = () => {
  const [announcement, setAnnouncement] = useState('');
  const [sentMessages, setSentMessages] = useState([]);
  const [receivedMessages, setReceivedMessages] = useState([]);
  const [users, setUsers] = useState([]);
  const [recipient, setRecipient] = useState('');
  const [messageContent, setMessageContent] = useState('');
  const [editingMessage, setEditingMessage] = useState(null);
  const [editingAnnouncement, setEditingAnnouncement] = useState(null);
  const [sentAnnouncements, setSentAnnouncements] = useState([]);
  const [alert, setAlert] = useState({ show: false, message: '', type: '' });
  const [refresh, setRefresh] = useState('');
  const [filterDate, setFilterDate] = useState(''); // State for date filter

  useEffect(() => {
    fetchMessages();
    fetchReceivedMessages();
    fetchUsers();
    fetchAnnouncements();
  }, [refresh]);

  const fetchMessages = async () => {
    try {
      const userId = JSON.parse(localStorage.getItem("user"))?._id;
      const response = await fetch(`/api/messages/${userId}/sent`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      const data = await response.json();
      setSentMessages(Array.isArray(data) ? data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)) : []);
    } catch (error) {
      console.error('Error fetching sent messages:', error);
    }
  };

  const fetchReceivedMessages = async () => {
    try {
      const userId = JSON.parse(localStorage.getItem("user"))?._id;
      const response = await fetch(`/api/messages/${userId}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      const data = await response.json();
      setReceivedMessages(Array.isArray(data) ? data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)) : []);
    } catch (error) {
      console.error('Error fetching received messages:', error);
    }
  };

  const fetchUsers = async () => {
    try {
      const response = await fetch('/api/users', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      const data = await response.json();
      const filteredUsers = data.filter((user) => user.role !== 'admin');
      setUsers(filteredUsers);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const fetchAnnouncements = async () => {
    try {
      const response = await fetch('/api/announcements', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      const data = await response.json();
      setSentAnnouncements(Array.isArray(data) ? data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)) : []);
    } catch (error) {
      console.error('Error fetching announcements:', error);
    }
  };

  const filterByDate = (items) => {
    if (!filterDate) return items; // If no filter date, return all items
    return items.filter((item) => {
      const itemDate = new Date(item.createdAt).toLocaleDateString();
      const selectedDate = new Date(filterDate).toLocaleDateString();
      return itemDate === selectedDate;
    });
  };

  const handlePostAnnouncement = async () => {
    if (!announcement) {
      setAlert({ show: true, message: 'Please enter an announcement.', type: 'danger' });
      return;
    }

    try {
      const method = editingAnnouncement ? 'PUT' : 'POST';
      const url = editingAnnouncement
        ? `/api/announcements/${editingAnnouncement._id}`
        : '/api/announcements';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({
          title: 'General Announcement',
          content: announcement,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setAlert({
          show: true,
          message: errorData.error || 'Error posting announcement.',
          type: 'danger',
        });
        return;
      }

      setAnnouncement('');
      setEditingAnnouncement(null);
      setAlert({ show: true, message: 'Announcement saved successfully!', type: 'success' });
      setRefresh(Date.now());
    } catch (error) {
      console.error('Error posting announcement:', error.message);
      setAlert({ show: true, message: 'Error posting announcement.', type: 'danger' });
    }
  };

  const handleSendMessage = async () => {
    if (!recipient || !messageContent) {
      setAlert({ show: true, message: 'Please select a recipient and enter a message.', type: 'danger' });
      return;
    }

    try {
      const method = editingMessage ? 'PUT' : 'POST';
      const url = editingMessage
        ? `/api/messages/${editingMessage._id}`
        : '/api/messages';

      const adminData = JSON.parse(localStorage.getItem("user"));
      const body = editingMessage
        ? { content: messageContent }
        : { receiverId: recipient, senderId: adminData?._id, content: messageContent };

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        setAlert({ show: true, message: 'Error saving message.', type: 'danger' });
        return;
      }

      setMessageContent('');
      setRecipient('');
      setEditingMessage(null);
      setAlert({ show: true, message: 'Message saved successfully!', type: 'success' });
      setRefresh(Date.now());
    } catch (error) {
      console.error('Error saving message:', error);
      setAlert({ show: true, message: 'Error saving message.', type: 'danger' });
    }
  };

  const handleEditMessage = (message) => {
    setEditingMessage(message);
    setRecipient(message.receiverId?._id || '');
    setMessageContent(message.content || '');
  };

  const handleEditAnnouncement = (announcement) => {
    setEditingAnnouncement(announcement);
    setAnnouncement(announcement.content);
  };

  const handleDeleteMessage = async (id, isSent) => {
    try {
      const response = await fetch(`/api/messages/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });

      if (!response.ok) {
        setAlert({ show: true, message: 'Error deleting message.', type: 'danger' });
        return;
      }

      if (isSent) {
        setSentMessages(sentMessages.filter((msg) => msg._id !== id));
      } else {
        setReceivedMessages(receivedMessages.filter((msg) => msg._id !== id));
      }

      setAlert({ show: true, message: 'Message deleted successfully!', type: 'success' });
    } catch (error) {
      console.error('Error deleting message:', error);
      setAlert({ show: true, message: 'Error deleting message.', type: 'danger' });
    }
  };

  const handleDeleteAnnouncement = async (id) => {
    try {
      const response = await fetch(`/api/announcements/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });

      if (!response.ok) {
        setAlert({ show: true, message: 'Error deleting announcement.', type: 'danger' });
        return;
      }

      setSentAnnouncements(sentAnnouncements.filter((announcement) => announcement._id !== id));
      setAlert({ show: true, message: 'Announcement deleted successfully!', type: 'success' });
    } catch (error) {
      console.error('Error deleting announcement:', error);
      setAlert({ show: true, message: 'Error deleting announcement.', type: 'danger' });
    }
  };

  const handleCloseAlert = () => {
    setAlert({ show: false, message: '', type: '' });
  };

  return (
    <>
      <Header />
      <div className="container my-5 admin-message-container">
        <h2 className="text-center my-3">Admin Messaging & Announcements</h2>
        {alert.show && (
          <Alert
            variant={alert.type}
            onClose={handleCloseAlert}
            dismissible
            className="admin-message-alert"
          >
            <strong>{alert.message}</strong>
          </Alert>
        )}

        <div className="filter-section mb-4">
          <label htmlFor="filterDate" className="form-label">
            <Badge bg="primary">Filter</Badge>
          </label>
          <input
            type="date"
            id="filterDate"
            className="form-control"
            value={filterDate}
            onChange={(e) => setFilterDate(e.target.value)}
            style={{width:'45px'}}
          />
        </div>

        <div className="announcement-section mt-4 p-4 rounded shadow">
          <h4><FaBullhorn className="me-2" />Post Announcement</h4>
          <textarea
            className="form-control mt-3"
            value={announcement}
            onChange={(e) => setAnnouncement(e.target.value)}
            placeholder="Enter announcement here..."
          ></textarea>
          <button className="btn btn-primary mt-3" onClick={handlePostAnnouncement}>
            {editingAnnouncement ? 'Update Announcement' : 'Post Announcement'}
          </button>
        </div>

        <div className="messages-display mt-5 p-4 rounded shadow">
          <h4><FaInbox className="me-2" />Sent Announcements</h4>
          {filterByDate(sentAnnouncements).length > 0 ? (
            <ul className="list-group">
              {filterByDate(sentAnnouncements).map((announcement) => (
                <li
                  key={announcement._id}
                  className="message-list-group-item d-flex justify-content-between align-items-center mb-1"
                >
                  <span>{announcement.content} <br /><small>{formatDateTime(announcement.createdAt)}</small></span>
                  <div>
                    <FaEdit
                      className="text-primary me-2"
                      onClick={() => handleEditAnnouncement(announcement)}
                    />
                    <FaTrash
                      className="text-danger"
                      onClick={() => handleDeleteAnnouncement(announcement._id)}
                    />
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p>No sent announcements to display.</p>
          )}
        </div>

        <div className="messages-display mt-5 p-4 rounded shadow">
          <h4><FaInbox className="me-2" />Sent Messages</h4>
          {filterByDate(sentMessages).length > 0 ? (
            <ul className="list-group">
              {filterByDate(sentMessages).map((msg) => (
                <li
                  key={msg._id}
                  className="message-list-group-item d-flex justify-content-between align-items-center mb-1"
                >
                  <span>To: {msg.receiverId?.lastName} - {msg.content} <br /><small>{formatDateTime(msg.createdAt)}</small></span>
                  <div>
                    <FaEdit className="text-primary me-2" onClick={() => handleEditMessage(msg)} />
                    <FaTrash
                      className="text-danger"
                      onClick={() => handleDeleteMessage(msg._id, true)}
                    />
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p>No sent messages to display.</p>
          )}
        </div>

        <div className="messages-display mt-5 p-4 rounded shadow">
          <h4><FaInbox className="me-2" />Received Messages from Patients</h4>
          {filterByDate(receivedMessages).length > 0 ? (
            <ul className="list-group">
              {filterByDate(receivedMessages).map((msg) => (
                <li
                  key={msg._id}
                  className="message-list-group-item d-flex justify-content-between align-items-center mb-1"
                >
                  <span>From: {msg.senderId?.lastName || 'Unknown'} - {msg.content} <br /><small>{formatDateTime(msg.createdAt)}</small></span>
                  <FaTrash
                    className="text-danger"
                    onClick={() => handleDeleteMessage(msg._id, false)}
                  />
                </li>
              ))}
            </ul>
          ) : (
            <p>No received messages to display.</p>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AdminMessagingPage;
