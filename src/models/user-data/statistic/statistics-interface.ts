import { InferSchemaType, Schema } from "mongoose";
import { activitySchema } from "./activity-interface";
import { rankSchema } from "./rank-interface";
import { firstRank, firstSubRank } from "./ranks-data";

const statisticsSchema = new Schema(
    {
        rank: { type: rankSchema, default: firstRank, require: true },
        subRank: { type: rankSchema, default: firstSubRank, require: true },
        timeMorses: { type: Number, default: 0, require: true },
        timeColdShowers: { type: Number, default: 0, require: true },
        activity: { type: [activitySchema], default: [], require: true },
    },
    {
        _id: false,
    }
);

export type Statistics = InferSchemaType<typeof statisticsSchema>;
export default statisticsSchema;
