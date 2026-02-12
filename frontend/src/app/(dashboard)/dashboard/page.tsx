export default function DashboardPage() {
    return (
        <div className="min-h-screen w-full bg-black">
            <div className="w-full">
                <h1 className="text-3xl font-bold mb-6 text-white">
                    Dashboard
                </h1>
                <div className="bg-zinc-900 p-6 rounded-lg shadow-lg">
                    <p className="text-gray-300">
                        Welcome to your dashboard! Accessible only to authenticated users.
                    </p>
                </div>
            </div>
        </div>
    );
}