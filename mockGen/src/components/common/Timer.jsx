import React from 'react';
import { Clock } from 'lucide-react'; // Assuming you have lucide-react

/**
 * A simple UI component to display the formatted time.
 */
function Timer({ formattedTime }) {
    return (
        <div className="flex items-center justify-center gap-2 p-3 bg-red-100 text-red-700 font-bold rounded-lg shadow-md">
            <Clock size={20} />
            <span>{formattedTime}</span>
        </div>
    );
}

export default Timer;