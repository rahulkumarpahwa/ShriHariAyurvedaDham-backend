import { User } from "../models/userModel.js";

const timeSlot = [
  { slot: "10:00am", slot1: true },
  { slot: "10:30am", slot2: true },
  { slot: "11:00am", slot3: true },
  { slot: "11:30am", slot4: true },
  { slot: "04:00pm", slot5: true },
  { slot: "04:30pm", slot6: true },
  { slot: "05:00pm", slot7: true },
  { slot: "05:30pm", slot8: true },
];

export const getSlotTime = async (req, res) => {
  // console.log(req.params.date);
  const users = await User.find();
  let filteredUsers = users.filter(
    (user) => user.bookedDate === req.params.date
  );
  let result = [
    { slot: "10:00am", slot1: true },
    { slot: "10:30am", slot2: true },
    { slot: "11:00am", slot3: true },
    { slot: "11:30am", slot4: true },
    { slot: "04:00pm", slot5: true },
    { slot: "04:30pm", slot6: true },
    { slot: "05:00pm", slot7: true },
    { slot: "05:30pm", slot8: true },
  ];
  for (let user of filteredUsers) {
    for (let i = 0; i < timeSlot.length; i++) {
      // console.log(user.time === timeSlot[i][`slot${i + 1}`]);
      if (user.time === timeSlot[i].slot) {
        result[i][`slot${i+1}`] = false;
        // result.push(timeSlot[i]);
      }
    }
  }
 
  // const date = new Date();
  // res.status(200).json(date.toDateString() === getpayment.user[0].bookedDate);
  res.status(200).json(result);
};
