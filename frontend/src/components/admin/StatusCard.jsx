const StatusCard = ({ title, count, status, icon }) => {
  const statusColors = {
    pending: {
      bg: 'bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20',
      border: 'border-yellow-300 dark:border-yellow-700',
      text: 'text-yellow-700 dark:text-yellow-400',
      iconBg:
        'bg-gradient-to-br from-yellow-100 to-yellow-200 dark:from-yellow-900/50 dark:to-yellow-800/50',
      ring: 'ring-yellow-200 dark:ring-yellow-800',
      gradient: 'from-yellow-400 to-orange-500',
    },
    in_progress: {
      bg: 'bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20',
      border: 'border-blue-300 dark:border-blue-700',
      text: 'text-blue-700 dark:text-blue-400',
      iconBg:
        'bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-900/50 dark:to-blue-800/50',
      ring: 'ring-blue-200 dark:ring-blue-800',
      gradient: 'from-blue-400 to-indigo-500',
    },
    delivered: {
      bg: 'bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20',
      border: 'border-green-300 dark:border-green-700',
      text: 'text-green-700 dark:text-green-400',
      iconBg:
        'bg-gradient-to-br from-green-100 to-green-200 dark:from-green-900/50 dark:to-green-800/50',
      ring: 'ring-green-200 dark:ring-green-800',
      gradient: 'from-green-400 to-emerald-500',
    },
  };

  const colors = statusColors[status] || statusColors.pending;

  return (
    <div
      className={`${colors.bg} ${colors.border} border-2 rounded-2xl p-6 hover:shadow-2xl hover:scale-105 transition-all duration-300 transform hover:-translate-y-2 relative overflow-hidden group cursor-pointer`}
    >
      {/* Animated Background Gradient */}
      <div
        className={`absolute inset-0 bg-gradient-to-br ${colors.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
      ></div>

      {/* Ring effect on hover */}
      <div
        className={`absolute inset-0 rounded-2xl ring-4 ${colors.ring} opacity-0 group-hover:opacity-100 transition-opacity duration-300 scale-105`}
      ></div>

      <div className="relative z-10 flex items-center justify-between">
        <div className="space-y-1">
          <p className="text-sm font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
            {title}
          </p>
          <p
            className={`text-4xl font-extrabold ${colors.text} transition-all duration-300 group-hover:scale-110 inline-block`}
          >
            {count}
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-500">Clients</p>
        </div>
        <div
          className={`${colors.iconBg} p-4 rounded-xl group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-lg`}
        >
          <div className="transform transition-transform duration-300">
            {icon || (
              <svg
                className={`w-7 h-7 ${colors.text}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatusCard;
