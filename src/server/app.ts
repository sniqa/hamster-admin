/* eslint-disable @typescript-eslint/no-explicit-any */
import Fastify, {
  FastifyInstance,
  FastifyReply,
  FastifyRequest,
} from "fastify";
import jwt from "@fastify/jwt";
import cors from "@fastify/cors";
import {
  create_network,
  delete_network_by_id,
  find_ip_address_by_network_id,
  find_network,
  find_network_select,
  find_network_tree,
  update_network,
} from "./controllers/network";
import { successResult, faildResult } from "./utils/result";
import {
  create_device_model,
  delete_device_model,
  find_device_model,
  find_device_model_select,
  update_device_model,
} from "./controllers/deviceModel";
import {
  create_device,
  delete_device_by_id,
  find_device,
  find_device_history_by_id,
  update_device,
} from "./controllers/devices";
import { create_user, login } from "./controllers/user";
import { LoginInfo } from "@/types/user";

const server: FastifyInstance = Fastify({});

await server.register(cors, {
  origin: "*",
});

await server.register(jwt, {
  secret: "SECRET",
});

server.addHook("onRequest", async (request) => {
  try {
    await request.jwtVerify();
  } catch {
    request.user = "";
  }
});

const request = async (
  req: FastifyRequest,
  reply: FastifyReply,
  handler: (data: any) => any
) => {
  try {
    const body = req.body;
    const result = await handler(body);
    return reply.send(successResult(result));
  } catch (err) {
    return reply.send(faildResult((err as Error).message));
  }
};

// login
server.post("/login", async (req, reply) => {
  try {
    const body = req.body;
    const userInfo = await login(body as LoginInfo);
    const token = server.jwt.sign({ id: userInfo.id });
    reply.send({ success: true, data: { token, user: userInfo } });
  } catch (err) {
    return reply.send(faildResult((err as Error).message));
  }
});

// network
server.get(
  "/network",
  async (req, reply) => await request(req, reply, find_network)
);

server.get(
  "/network/tree",
  async (req, reply) => await request(req, reply, find_network_tree)
);

server.get(
  "/network/select",
  async (req, reply) => await request(req, reply, find_network_select)
);

server.post(
  "/network/create",
  async (req, reply) => await request(req, reply, create_network)
);

server.post(
  "/network/update",
  async (req, reply) => await request(req, reply, update_network)
);

server.post(
  "/network/delete",
  async (req, reply) => await request(req, reply, delete_network_by_id)
);

server.post(
  "/ip-address",
  async (req, reply) => await request(req, reply, find_ip_address_by_network_id)
);

// device model
server.get(
  "/device-model",
  async (req, reply) => await request(req, reply, find_device_model)
);

server.get(
  "/device-model/select",
  async (req, reply) => await request(req, reply, find_device_model_select)
);

server.post(
  "/device-model/create",
  async (req, reply) => await request(req, reply, create_device_model)
);

server.post(
  "/device-model/update",
  async (req, reply) => await request(req, reply, update_device_model)
);

server.post(
  "/device-model/delete",
  async (req, reply) => await request(req, reply, delete_device_model)
);

// device
server.get(
  "/device",
  async (req, reply) => await request(req, reply, find_device)
);

server.post(
  "/device/create",
  async (req, reply) => await request(req, reply, create_device)
);

server.post(
  "/device/update",
  async (req, reply) => await request(req, reply, update_device)
);

server.post(
  "/device/delete",
  async (req, reply) => await request(req, reply, delete_device_by_id)
);

// device history
server.post(
  "/device-history",
  async (req, reply) => await request(req, reply, find_device_history_by_id)
);

// user
server.post(
  "/create-user",
  async (req, reply) => await request(req, reply, create_user)
);

const start = async () => {
  try {
    server.listen({ port: 3000 });

    console.log(`server run at http://localhost:${3000}`);
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
};
start();
