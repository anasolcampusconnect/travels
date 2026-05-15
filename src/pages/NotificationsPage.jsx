import React, { useState } from "react";
import { ArrowLeft } from "lucide-react";
import {
  Bell,
  Package,
  Truck,
  CheckCircle,
  AlertCircle,
  Clock,
  MapPin,
  Wallet,
  ShieldCheck,
  RefreshCcw,
  Check,
  Trash2,
  Star,
  Filter,
  Search,
  Home,
} from "lucide-react";

const initialNotifications = [
  {
    id: 1,
    title: "Parcel Delivered Successfully",
    message:
      "Your parcel TRK-987654321 has been delivered to Bangalore.",
    time: "2 mins ago",
    type: "success",
    read: false,
    starred: true,
    icon: <CheckCircle size={18} />,
  },
  {
    id: 2,
    title: "Shipment In Transit",
    message:
      "Parcel TRK-555666777 is currently moving from Mumbai to Pune.",
    time: "10 mins ago",
    type: "transit",
    read: false,
    starred: false,
    icon: <Truck size={18} />,
  },
  {
    id: 3,
    title: "New Parcel Created",
    message:
      "A new parcel order has been created by Admin User.",
    time: "30 mins ago",
    type: "new",
    read: false,
    starred: false,
    icon: <Package size={18} />,
  },
  {
    id: 4,
    title: "Delivery Delayed",
    message:
      "Parcel TRK-111222333 may be delayed due to weather conditions.",
    time: "1 hour ago",
    type: "warning",
    read: true,
    starred: true,
    icon: <AlertCircle size={18} />,
  },
  {
    id: 5,
    title: "Pickup Scheduled",
    message:
      "Pickup has been scheduled for parcel TRK-444555666.",
    time: "2 hours ago",
    type: "pending",
    read: true,
    starred: false,
    icon: <Clock size={18} />,
  },
  {
    id: 6,
    title: "Payment Received",
    message:
      "Payment of ₹1,250 has been received successfully.",
    time: "3 hours ago",
    type: "success",
    read: true,
    starred: false,
    icon: <Wallet size={18} />,
  },
  {
    id: 7,
    title: "Parcel Arrived at Hub",
    message:
      "Parcel TRK-888999000 has arrived at Hyderabad hub.",
    time: "5 hours ago",
    type: "transit",
    read: false,
    starred: false,
    icon: <MapPin size={18} />,
  },
  {
    id: 8,
    title: "Security Verification Completed",
    message:
      "Your shipment verification has been completed successfully.",
    time: "Yesterday",
    type: "new",
    read: true,
    starred: true,
    icon: <ShieldCheck size={18} />,
  },
  {
    id: 9,
    title: "Parcel Returned",
    message:
      "Parcel TRK-121212121 has been returned to sender.",
    time: "Yesterday",
    type: "warning",
    read: true,
    starred: false,
    icon: <RefreshCcw size={18} />,
  },
  {
    id: 10,
    title: "Out For Delivery",
    message:
      "Parcel TRK-454545454 is out for delivery today.",
    time: "Yesterday",
    type: "success",
    read: false,
    starred: false,
    icon: <Truck size={18} />,
  },
];

const getStyles = (type) => {
  switch (type) {
    case "success":
      return {
        bg: "#ecfdf3",
        color: "#16a34a",
        border: "#bbf7d0",
      };

    case "transit":
      return {
        bg: "#fff7ed",
        color: "#ea580c",
        border: "#fed7aa",
      };

    case "new":
      return {
        bg: "#f5f3ff",
        color: "#9333ea",
        border: "#ddd6fe",
      };

    case "warning":
      return {
        bg: "#fef2f2",
        color: "#dc2626",
        border: "#fecaca",
      };

    default:
      return {
        bg: "#eff6ff",
        color: "#2563eb",
        border: "#bfdbfe",
      };
  }
};

const NotificationsPage = () => {
  const [notifications, setNotifications] =
    useState(initialNotifications);

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  // NAVIGATE TO HOME
  const goToHome = () => {
    window.location.href = "/";
  };

  const markAllAsRead = () => {
    setNotifications((prev) =>
      prev.map((item) => ({
        ...item,
        read: true,
      }))
    );
  };

  const toggleStar = (id) => {
    setNotifications((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, starred: !item.starred }
          : item
      )
    );
  };

  const deleteNotification = (id) => {
    setNotifications((prev) =>
      prev.filter((item) => item.id !== id)
    );
  };

  const deleteAllNotifications = () => {
    setNotifications([]);
  };

  const markAsRead = (id) => {
    setNotifications((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, read: true }
          : item
      )
    );
  };

  // FRONTEND SEARCH
  const filteredNotifications = notifications
    .filter((item) => {
      if (filter === "unread") return !item.read;
      if (filter === "starred") return item.starred;
      return true;
    })
    .filter((item) => {
      const searchText = search.toLowerCase();

      return (
        item.title.toLowerCase().includes(searchText) ||
        item.message.toLowerCase().includes(searchText) ||
        item.time.toLowerCase().includes(searchText)
      );
    });

  const unreadCount = notifications.filter(
    (item) => !item.read
  ).length;

  return (
    <div
      style={{
        width: "100%",
        padding: "18px",
        background: "#f4f7fb",
        minHeight: "100vh",
        boxSizing: "border-box",
      }}
    >
      {/* HEADER */}
      <div
        style={{
          width: "100%",
          background:
            "linear-gradient(90deg, #7c3aed, #ec008c)",
          borderRadius: "24px",
          padding: "24px 30px",
          color: "white",
          marginBottom: "18px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "16px",
          boxSizing: "border-box",
        }}
      >
        {/* LEFT SECTION */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
            flexWrap: "wrap",
          }}
        >
<button
  onClick={goToHome}
  style={{
   position: "relative",
    top: "-40px",
    left: "30px",
    transform: "translateX(-55px)",
    border: "none",
    // background: "rgba(255,255,255,0.16)",
    color: "white",
    width: "34px",
    height: "34px",
    borderRadius: "10px",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backdropFilter: "blur(10px)",
    zIndex: 100,
  }}
>
  <ArrowLeft size={16} strokeWidth={2.7} />
</button>
          {/* ICON */}
          <div
            style={{
              width: "60px",
              height: "60px",
              borderRadius: "18px",
              background: "rgba(255,255,255,0.15)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginLeft: "-40px",
            }}
          >
            <Bell size={30} />
          </div>

          {/* TITLE */}
          <div>
            <h1
              style={{
                margin: 0,
                fontSize: "32px",
                fontWeight: "700",
              }}
            >
              Notifications
            </h1>

            <p
              style={{
                marginTop: "5px",
                opacity: 0.92,
                fontSize: "15px",
              }}
            >
              Stay updated with parcel tracking activities
            </p>
          </div>
        </div>

        {/* RIGHT SECTION */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            flexWrap: "wrap",
          }}
        >
          <div
            style={{
              background: "rgba(255,255,255,0.15)",
              padding: "11px 18px",
              borderRadius: "40px",
              fontSize: "14px",
              fontWeight: "600",
              minHeight: "44px",
              display: "flex",
              alignItems: "center",
            }}
          >
            {unreadCount} Unread
          </div>

          <button
            onClick={markAllAsRead}
            style={{
              border: "none",
              background: "rgba(255,255,255,0.16)",
              color: "white",
              padding: "11px 18px",
              borderRadius: "40px",
              fontWeight: "600",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "8px",
              minHeight: "44px",
            }}
          >
            <Check size={16} />
            Mark all read
          </button>

          <button
            onClick={deleteAllNotifications}
            style={{
              border: "none",
              background: "rgba(255,255,255,0.16)",
              color: "white",
              padding: "11px 18px",
              borderRadius: "40px",
              fontWeight: "600",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "8px",
              minHeight: "44px",
            }}
          >
            <Trash2 size={16} />
            Delete all
          </button>
        </div>
      </div>

      {/* SEARCH + FILTER */}
      <div
        style={{
          display: "flex",
          gap: "14px",
          marginBottom: "20px",
          flexWrap: "wrap",
        }}
      >
        {/* SEARCH */}
        <div
          style={{
            flex: 1,
            minWidth: "250px",
            background: "rgba(255,255,255,0.88)",
            backdropFilter: "blur(10px)",
            borderRadius: "18px",
            padding: "14px 18px",
            display: "flex",
            alignItems: "center",
            gap: "12px",
            boxShadow:
              "0 8px 24px rgba(15,23,42,0.05)",
          }}
        >
          <Search size={18} color="#64748b" />

          <input
            type="text"
            placeholder="Search notifications..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            style={{
              border: "none",
              outline: "none",
              width: "100%",
              fontSize: "14px",
              background: "transparent",
            }}
          />
        </div>

        {/* FILTER */}
        <div
          style={{
            background: "white",
            borderRadius: "18px",
            padding: "14px 18px",
            display: "flex",
            alignItems: "center",
            gap: "10px",
            boxShadow:
              "0 8px 24px rgba(15,23,42,0.05)",
          }}
        >
          <Filter size={18} color="#64748b" />

          <select
            value={filter}
            onChange={(e) =>
              setFilter(e.target.value)
            }
            style={{
              border: "none",
              outline: "none",
              background: "transparent",
              fontSize: "14px",
              cursor: "pointer",
            }}
          >
            <option value="all">All</option>
            <option value="unread">
              Unread
            </option>
            <option value="starred">
              Starred
            </option>
          </select>
        </div>
      </div>

      {/* EMPTY STATE */}
      {filteredNotifications.length === 0 && (
        <div
          style={{
            textAlign: "center",
            padding: "60px 20px",
            color: "#64748b",
            fontSize: "18px",
            fontWeight: "600",
          }}
        >
          No notifications found
        </div>
      )}

      {/* NOTIFICATION LIST */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "16px",
        }}
      >
        {filteredNotifications.map((item) => {
          const styles = getStyles(item.type);

          return (
            <div
              key={item.id}
              onClick={() => markAsRead(item.id)}
              style={{
                background: item.read
                  ? "rgba(255,255,255,0.92)"
                  : "linear-gradient(135deg,#fff7fd,#fdf4ff)",
                borderRadius: "22px",
                padding: "18px 22px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                border: item.read
                  ? `1px solid ${styles.border}`
                  : "2px solid #d946ef",
                boxShadow: item.read
                  ? "0 6px 18px rgba(15,23,42,0.04)"
                  : "0 12px 30px rgba(217,70,239,0.18)",
                transition: "all 0.28s ease",
                position: "relative",
                cursor: "pointer",
                backdropFilter: "blur(12px)",
              }}
            >
              {!item.read && (
                <div
                  style={{
                    position: "absolute",
                    top: "16px",
                    right: "16px",
                    width: "10px",
                    height: "10px",
                    borderRadius: "50%",
                    background: "#ec008c",
                  }}
                />
              )}

              {/* LEFT */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "16px",
                  flex: 1,
                }}
              >
                <div
                  style={{
                    width: "50px",
                    height: "50px",
                    minWidth: "50px",
                    borderRadius: "16px",
                    background: styles.bg,
                    color: styles.color,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {item.icon}
                </div>

                <div>
                 <div
  style={{
    display: "flex",
    alignItems: "center",
    gap: "10px",
    marginBottom: "5px",
  }}
>
  <h3
    style={{
      margin: 0,
      fontSize: "17px",
      fontWeight: item.read
        ? "600"
        : "700",
      color: "#1e293b",
    }}
  >
    {item.title}
  </h3>

  {!item.read && (
    <span
      style={{
        background:
          "linear-gradient(90deg,#7c3aed,#ec008c)",
        color: "white",
        fontSize: "10px",
        padding: "5px 10px",
        borderRadius: "30px",
        fontWeight: "700",
        letterSpacing: "0.4px",
      }}
    >
      NEW
    </span>
  )}
</div>

                  <p
                    style={{
                      marginTop: "6px",
                      color: "#64748b",
                      fontSize: "14px",
                    }}
                  >
                    {item.message}
                  </p>
                </div>
              </div>

              {/* RIGHT */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  marginLeft: "18px",
                }}
              >
                {/* STAR */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleStar(item.id);
                  }}
                  style={{
                    border: "none",
                    background:
                      "rgba(248,250,252,0.9)",
                    width: "40px",
                    height: "40px",
                    borderRadius: "14px",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Star
                    size={16}
                    color={
                      item.starred
                        ? "#f59e0b"
                        : "#94a3b8"
                    }
                    fill={
                      item.starred
                        ? "#f59e0b"
                        : "none"
                    }
                  />
                </button>

                {/* DELETE */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteNotification(item.id);
                  }}
                  style={{
                    border: "none",
                    background:
                      "rgba(248,250,252,0.9)",
                    width: "40px",
                    height: "40px",
                    borderRadius: "14px",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Trash2
                    size={16}
                    color="#dc2626"
                  />
                </button>

                {/* TIME */}
                <span
                  style={{
                    fontSize: "12px",
                    color: "#64748b",
                    background:
                      "rgba(248,250,252,0.9)",
                    padding: "8px 13px",
                    borderRadius: "30px",
                    whiteSpace: "nowrap",
                    fontWeight: "500",
                  }}
                >
                  {item.time}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default NotificationsPage;