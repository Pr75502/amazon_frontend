import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { fetchById } from '../../features/userSlice';
import { useRef, useState } from 'react';
import { editUserDetails } from '../../features/userSlice';
import { toast } from 'react-hot-toast';





const Profile = () => {
    const nameRef = useRef();
    const addressRef = useRef();
    const [editId, setEditId] = useState(null)

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchById());
    }, [dispatch]);
    const user = useSelector((state) => state.user.user);

    useEffect(() => {
        if (editId && user) {
            nameRef.current.value = user.name;
            addressRef.current.value = user.address;
        }
    }, [editId, user]);

    const handleDetails = (id) => {
        setEditId(id)

    }
    const handleSubmit = (e) => {
        e.preventDefault();
        const name = nameRef.current.value
        const address = addressRef.current.value
        const editUser = {
            name: name,
            address: address
        }
        dispatch(editUserDetails(editUser))
        toast.success('user details updated')
        nameRef.current.value = ''
        addressRef.current.value = ''
        setEditId(null)
    }
    return (
        <div className="bg-gray-100 min-h-screen flex items-center justify-center">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                <h1 className="text-2xl font-bold text-center text-gray-800 mb-8">
                    Profile
                </h1>
                {
                    editId ? (
                        <div>
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <input type='text' placeholder='name' ref={nameRef} className="w-full p-2 border border-gray-300 rounded-lg" />

                                <input type='text' placeholder='address' ref={addressRef} className="w-full p-2 border border-gray-300 rounded-lg" />
                                <button type='submit' className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg">submit</button>
                            </form>
                        </div>) :

                        user && (
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-gray-700 font-semibold">
                                        User Id
                                    </label>
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
                                    <label className="block text-gray-700 font-semibold">
                                        Address
                                    </label>
                                    <p className="text-gray-800">{user.address}</p>
                                </div>
                                <button
                                    onClick={() => handleDetails(user._id)}
                                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg"
                                >
                                    edit user details
                                </button>
                            </div>
                        )

                }

            </div>
        </div>
    );
};

export default Profile;
