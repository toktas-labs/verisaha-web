declare module "jsmodbus" {
  import type { Socket } from "node:net";

  interface ModbusResponseBody {
    valuesAsArray?: unknown[];
    _valuesAsArray?: unknown[];
    _code?: number;
  }

  interface ModbusResponse {
    response?: {
      _body?: ModbusResponseBody;
    };
  }

  class TCPClient {
    constructor(socket: Socket, unitId: number);
    readCoils(address: number, quantity: number): Promise<ModbusResponse>;
    readDiscreteInputs(address: number, quantity: number): Promise<ModbusResponse>;
    readHoldingRegisters(address: number, quantity: number): Promise<ModbusResponse>;
    readInputRegisters(address: number, quantity: number): Promise<ModbusResponse>;
  }

  export const client: {
    TCP: typeof TCPClient;
  };
}
