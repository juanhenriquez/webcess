import { Injectable } from '@angular/core';

import { App } from './../models/app';

@Injectable()
export class MemoryManagmentService {

  mainMemorySize: number = 500;
  mainMemoryPointer: number = 0;

  diskSize: number = 1000;
  diskPointer: number = 0;

  mainMemoryPages: Array<number> = new Array(this.mainMemorySize).fill(null);
  diskPages: Array<number> = new Array(this.diskSize).fill(null);

  allocateMemory(memory: Array<number>, id: number, size: number) {
    let remaining = size;
    let index = 0;
    if (this.checkAvailableSpace(memory) >= size) {
      while(remaining > 0) {
        if (memory[index] === null) {
          memory[index] = id;
          remaining--;
        }
        index++;
      }
    } 
  }

  dealocateMemory(memory: Array<number>, id: number) {
    memory.forEach((page, index) => {
      if (page === id) {
        memory[index] = null;
      }
    });
  }

  compact(memory: Array<number>) {
    let range = memory.length - this.checkAvailableSpace(memory);
    let temp;
    for (let i = memory.length - 1; i >= 0; i--) {
      for (let j = 0; j < i; j++) {
        if (memory[j] > memory[j + 1]) {
          temp = memory[j];
          memory[j] = memory[j + 1];
          memory[j + 1] = temp;
        }
      }
    }

    memory.reverse();

    for (let i = range - 1; i >= 0; i--) {
      for (let j = 0; j < i; j++) {
        if (memory[j] > memory[j + 1]) {
          temp = memory[j];
          memory[j] = memory[j + 1];
          memory[j + 1] = temp;
        }
      }
    }
  }

  checkAvailableSpace(memory): number {
    return memory.filter((page) => page === null).length;
  }

}