"use client";

type Props = {
  availability: {
    day: string;
    from: string;
    to: string;
    _id: string;
  }[];
};

const daysOfWeek = ["Saturday", "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

const AvailabilityGrid = ({ availability }: Props) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {daysOfWeek.map((day) => {
        const match = availability?.find((slot) => slot.day === day);
        return (
          <div
            key={day}
            className={`border rounded p-4 ${match ? "bg-green-50 border-green-300" : "bg-gray-50"}`}
          >
            <h4 className="font-semibold">{day}</h4>
            {match ? (
              <p className="text-sm text-gray-700 mt-1">
                {match.from} - {match.to}
              </p>
            ) : (
              <p className="text-sm text-gray-400 mt-1">Not Available</p>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default AvailabilityGrid;
