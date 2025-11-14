import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useRef, useState } from 'react';
import { fetchById, editUserDetails, updateUserProfilePhoto } from '../../features/userSlice';
import { toast } from 'react-hot-toast';
import { FaUpload, FaSave, FaEdit } from 'react-icons/fa';

const Profile = () => {
    const nameRef = useRef();
    const addressRef = useRef();
    const [editId, setEditId] = useState(null);
    const [photo, setPhoto] = useState(null);

    const dispatch = useDispatch();
    const user = useSelector((state) => state.user.user);

    useEffect(() => {
        dispatch(fetchById());
    }, [dispatch]);

    useEffect(() => {
        if (editId && user) {
            nameRef.current.value = user.name;
            addressRef.current.value = user.address;
        }
    }, [editId, user]);

    const handleDetails = (id) => {
        setEditId(id);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const name = nameRef.current.value;
        const address = addressRef.current.value;
        const editUser = {
            name: name,
            address: address,
        };
        dispatch(editUserDetails(editUser));
        toast.success('User details updated');
        setEditId(null);
    };

    const handlePhotoSubmit = async (e) => {
        e.preventDefault();
        if (!photo) {
            toast.error("Please select a photo");
            return;
        }
        const formData = new FormData();
        formData.append("photo", photo);

        try {
            await dispatch(updateUserProfilePhoto(formData)).unwrap();
            toast.success("Photo updated successfully");
            setPhoto(null);
            dispatch(fetchById()); // Refresh user data
        } catch (err) {
            toast.error(err.message || "Failed to update photo");
        }
    };

    return (
        <div className="bg-gray-100 min-h-screen flex items-center justify-center">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                <h1 className="text-2xl font-bold text-center text-gray-800 mb-8">
                    Profile
                </h1>

                {user && (
                    <div className="flex justify-center mb-4">
                        <img src={user.avatar || `https://ui-avatars.com/api/?name=${user.name}&background=random`} alt="User" className="w-32 h-32 rounded-full object-cover" />
                    </div>
                )}

                <form onSubmit={handlePhotoSubmit} className="space-y-4 mb-8">
                    <div>
                        <label className="block text-gray-700 font-semibold mb-2">Update Profile Photo</label>
                        <input type="file" onChange={(e) => setPhoto(e.target.files[0])} className="w-full p-2 border border-gray-300 rounded-lg" />
                    </div>
                    <button type="submit" className="w-full bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-lg flex items-center justify-center gap-2">
                        <FaUpload /> Upload Photo
                    </button>
                </form>

                {editId ? (
                    <div>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <input type='text' placeholder='name' ref={nameRef} className="w-full p-2 border border-gray-300 rounded-lg" />
                            <input type='text' placeholder='address' ref={addressRef} className="w-full p-2 border border-gray-300 rounded-lg" />
                            <button type='submit' className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg flex items-center justify-center gap-2">
                                <FaSave /> Submit
                            </button>
                        </form>
                    </div>
                ) : user && (
                    <div className="space-y-4">
                        <div>
                            <label className="block text-gray-700 font-semibold">User Id</label>
                            <p className="text-gray-800">{user._id}</p>
                        </div>
                        <div>
                            <label className="block text-gray-700 font-semibold">Name</label>
                            <p className="text-gray-800">{user.name}</p>
                        </div>
                        <div>
                            <label className="block text-gray-700 font-semibold">Email</label>
                            <p className="text-gray-800">{user.email}</p>
                        </div>
                        <div>
                            <label className="block text-gray-700 font-semibold">Address</label>
                            <p className="text-gray-800">{user.address}</p>
                        </div>
                        <button
                            onClick={() => handleDetails(user._id)}
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg flex items-center justify-center gap-2"
                        >
                            <FaEdit /> Edit User Details
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Profile;