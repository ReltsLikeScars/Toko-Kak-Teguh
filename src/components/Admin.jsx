import React, { useEffect, useState } from "react";


const Admin = () => {

    return (
        <div className="p-8">
        <h1 className="flex justify-center m-auto text-3xl mb-10">Only Admin</h1>
        {!isAdmin ? (
            <form onSubmit={handleLogin} className="space-y-4">
                <h2>Projects</h2>
                <input type="email" placeholder="Email"className="w-full p-2 border rounded"/>
                <input type="password" placeholder="Password" className="w-full p-2 border rounded" />
                <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">Login</button>
            </form>
        ) : (
            <div>
            <button  className="px-4 py-2 bg-red-500 text-white rounded mb-4">Logout</button>

            <form  className="sapce-y-4">
            <h1 className="text-2xl">Insert Your Project</h1>
            <input type="text" placeholder="Project Name" className="w-full p-2 border rounded" required/>
            <input type="text" placeholder="Project Description"  className="w-full p-2 border rounded" required/>
            <input type="text" placeholder="Project Link"  className="w-full p-2 border rounded" required/>
            <button type="submit" className="px-4 py-2 bg-green-500 text-white rounded"></button>
            {isEditing && (
                <button type="button" className="px-4 py-2 bg-gray-500 text-white rounded ml-2"></button>
            )}
            </form>
            <div className="mt-8">
            <h2 className="text2xl font-semibold mb-4">Projects</h2>
            <ul>
                {projects.map(project => (
                    <li key={(project.id)} className="flex justify-between items-center border-b py-2">
                        <span>{project.name}</span>
                        <div>
                            <button  className="px-4 py-1 bg-yellow-500 text-white rounded mr-2">Edit</button>
                            <button className="px-4 py-1 bg-red-500 text-white rounded mr-2">Delete</button>
                        </div>
                    </li>
                ))}
            </ul>
            </div>
            </div>
        )}
       </div>
    );
};

export default Admin;