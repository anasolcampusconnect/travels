import React from "react";
import QRCode from "react-qr-code";
import {
  QrCode,
  Smartphone,
  ArrowRight,
  ShieldCheck,
  Package,
} from "lucide-react";

const QRBookingPage = () => {
  const qrValue =
    "http://https:/anasolcampusconnect.github.io/travels#/create-parcel";

  return (
    <>
      <style>
        {`
          @keyframes floatQR {
            0% {
              transform: translateY(0px);
            }
            50% {
              transform: translateY(-6px);
            }
            100% {
              transform: translateY(0px);
            }
          }
        `}
      </style>

      <div
        style={{
          width: "100%",
          minHeight: "100vh",
          background: "#f5f7fb",
          padding: "20px",
          boxSizing: "border-box",
        }}
      >
        {/* HEADER */}
        <div
          style={{
            width: "100%",
            background:
              "linear-gradient(135deg,#6366f1 0%, #8b5cf6 100%)",
            borderRadius: "28px",
            padding: "24px 28px",
            color: "white",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "20px",
            marginBottom: "24px",
            boxSizing: "border-box",
            boxShadow:
              "0 10px 30px rgba(99,102,241,0.12)",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* LEFT */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "18px",
              position: "relative",
              zIndex: 2,
            }}
          >
            <div
              style={{
                width: "68px",
                height: "68px",
                borderRadius: "22px",
                background: "rgba(255,255,255,0.12)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <QrCode size={34} />
            </div>

            <div>
              <h1
                style={{
                  margin: 0,
                  fontSize: "34px",
                  fontWeight: "800",
                  letterSpacing: "-0.5px",
                }}
              >
                QR Parcel Booking
              </h1>

              <p
                style={{
                  marginTop: "8px",
                  fontSize: "15px",
                  opacity: 0.92,
                }}
              >
                Scan QR code to instantly create parcel
                bookings
              </p>
            </div>
          </div>

          {/* RIGHT */}
          <div
            style={{
              background: "rgba(255,255,255,0.12)",
              padding: "12px 22px",
              borderRadius: "40px",
              display: "flex",
              alignItems: "center",
              gap: "10px",
              fontWeight: "600",
              fontSize: "14px",
              backdropFilter: "blur(10px)",
              position: "relative",
              zIndex: 2,
            }}
          >
            <ShieldCheck size={18} />
            Secure QR Access
          </div>
        </div>

        {/* MAIN SECTION */}
        <div
          style={{
            display: "flex",
            gap: "24px",
            flexWrap: "wrap",
          }}
        >
          {/* LEFT CARD */}
          <div
            style={{
              flex: 1,
              minWidth: "340px",
              background: "#ffffff",
              borderRadius: "28px",
              padding: "32px",
              boxShadow:
                "0 8px 24px rgba(15,23,42,0.06)",
              border: "1px solid #eef2ff",
            }}
          >
            {/* TITLE */}
            <div
              style={{
                textAlign: "center",
                marginBottom: "32px",
              }}
            >
              <h2
                style={{
                  margin: 0,
                  fontSize: "30px",
                  color: "#111827",
                  fontWeight: "800",
                }}
              >
                Scan QR Code
              </h2>

              <p
                style={{
                  marginTop: "14px",
                  color: "#64748b",
                  fontSize: "15px",
                  lineHeight: "1.8",
                  maxWidth: "500px",
                  marginInline: "auto",
                }}
              >
                Scan this QR code using your mobile
                camera to directly access the parcel
                booking page.
              </p>
            </div>

            {/* QR SECTION */}
            <div
              style={{
                width: "340px",
                height: "340px",
                margin: "0 auto",
                borderRadius: "32px",
                background: "#f8fafc",
                border: "1.5px dashed #c4b5fd",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {/* INNER BOX */}
              <div
                style={{
                  width: "270px",
                  height: "270px",
                  background: "white",
                  borderRadius: "28px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow:
                    "0 8px 20px rgba(15,23,42,0.08)",
                  animation:
                    "floatQR 3s ease-in-out infinite",
                  position: "relative",
                }}
              >
                {/* QR */}
                <QRCode
                  value={qrValue}
                  size={215}
                  bgColor="#ffffff"
                  fgColor="#000000"
                  level="H"
                />

                {/* CENTER LOGO */}
                <div
                  style={{
                    position: "absolute",
                    width: "58px",
                    height: "58px",
                    borderRadius: "18px",
                    background: "white",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    boxShadow:
                      "0 8px 20px rgba(0,0,0,0.10)",
                    border: "3px solid white",
                  }}
                >
                  <div
                    style={{
                      width: "44px",
                      height: "44px",
                      borderRadius: "14px",
                      background:"#181717",
                        // "linear-gradient(135deg,#6366f1,#8b5cf6)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "white",
                    }}
                  >
                    <Package size={22} />
                  </div>
                </div>
              </div>
            </div>

            {/* NOTE */}
            <div
              style={{
                marginTop: "24px",
                textAlign: "center",
                color: "#64748b",
                fontSize: "14px",
                lineHeight: "1.8",
                fontWeight: "500",
              }}
            >
              Users can instantly navigate to parcel
              booking by scanning the QR code.
            </div>
          </div>

          {/* RIGHT CARD */}
          <div
            style={{
              width: "420px",
              minWidth: "320px",
              background: "#ffffff",
              borderRadius: "28px",
              padding: "32px",
              boxShadow:
                "0 8px 24px rgba(15,23,42,0.06)",
              border: "1px solid #eef2ff",
            }}
          >
            <h3
              style={{
                marginTop: 0,
                marginBottom: "30px",
                fontSize: "30px",
                color: "#111827",
                fontWeight: "800",
              }}
            >
              How It Works
            </h3>

            {[
              {
                icon: <Smartphone size={20} />,
                title: "Open Camera",
                desc: "Use your mobile camera or QR scanner app.",
              },
              {
                icon: <QrCode size={20} />,
                title: "Scan QR Code",
                desc: "Point the camera at the generated QR code.",
              },
              {
                icon: <ArrowRight size={20} />,
                title: "Auto Redirect",
                desc: "User will be redirected to booking page.",
              },
              {
                icon: <Package size={20} />,
                title: "Create Parcel",
                desc: "Fill parcel details and complete booking.",
              },
            ].map((item, index) => (
              <div
                key={index}
                style={{
                  display: "flex",
                  gap: "16px",
                  marginBottom:
                    index !== 3 ? "26px" : "0px",
                  alignItems: "flex-start",
                }}
              >
                {/* ICON */}
                <div
                  style={{
                    width: "54px",
                    height: "54px",
                    minWidth: "54px",
                    borderRadius: "18px",
                    background:
                      "linear-gradient(135deg,#6366f1,#8b5cf6)",
                    color: "white",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    boxShadow:
                      "0 10px 20px rgba(99,102,241,0.16)",
                  }}
                >
                  {item.icon}
                </div>

                {/* CONTENT */}
                <div>
                  <h4
                    style={{
                      margin: 0,
                      marginBottom: "6px",
                      color: "#111827",
                      fontSize: "17px",
                      fontWeight: "700",
                    }}
                  >
                    {item.title}
                  </h4>

                  <p
                    style={{
                      margin: 0,
                      color: "#64748b",
                      fontSize: "14px",
                      lineHeight: "1.8",
                    }}
                  >
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default QRBookingPage;