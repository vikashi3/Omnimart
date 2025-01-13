import { FaLocationDot } from "react-icons/fa6";

function Location() {
    const getCurrentLocation = (e) => {
        e.preventDefault(); // Prevent form submission
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    console.log('User Location:', { latitude, longitude });
                },
                (error) => {
                    console.error('Error getting location:', error);
                }
            );
        } else {
            console.error('Geolocation is not supported by this browser.');
        }
    };

    return (
        <div className="flex flex-col items-center">
            <button
                type="button" 
                onClick={getCurrentLocation}
                title="Use Current Location"
            >
                <FaLocationDot size={28} className="text-primary hover:text-rose-600" />
            </button>
        </div>
    );
}

export default Location;
