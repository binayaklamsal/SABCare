import express from "express";
import {
  updateDoctor,
  deleteDoctor,
  getAllDoctor,
  getSingleDoctor,
  getPendingDoctors,
  getDoctorProfile,
  approveDoctor,
  declineDoctor,
} from "../Controllers/doctorController.js";
import { authenticate, restrict } from "../auth/verifyToken.js";

import reviewRouter from "./review.js";

const router = express.Router();

//nested route
router.use("/:doctorId/reviews", reviewRouter);

router.get("/:id", getSingleDoctor);
router.put("/approve/:id", approveDoctor);
router.put("/decline/:id", declineDoctor);
router.put("/delete/:id", deleteDoctor);
router.get("/", getAllDoctor);
router.get("/pending/all", getPendingDoctors);
router.put("/:id", authenticate, restrict(["doctor"]), updateDoctor);
router.delete("/:id", authenticate, restrict(["doctor"]), deleteDoctor);

router.get("/profile/me", authenticate, restrict(["doctor"]), getDoctorProfile);

export default router;
