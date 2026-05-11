export const sendFeeReminder = (member, currentMonth = "") =>{
    const phone = `91${member.phone}`;

    const message =
      `Hello ${member.name}, this is a reminder that your gym fee of ₹${member.fee} for ${currentMonth} is pending. Please pay soon. <br /> - SFC Gym`;

    const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
};