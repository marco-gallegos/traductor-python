
class ErrorColector {
  errors: string[] = [];
  clear() {
    this.errors = [];
  }
  push(error: string) {
    this.errors.push(error);  
  }
}

export const errors = new ErrorColector();
