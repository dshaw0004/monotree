import java.util.Scanner;

public class Amstrong{
  public static void main(String[] args){
    int num = 0;
    if (args.length > 0){
      num = Integer.parseInt(args[0]);
    }else{
      Scanner sc = new Scanner(System.in);
      System.out.print("Enter a number: ");
      num = sc.nextInt();
      sc.close();
    }
    int temp = num, numberOfDigits = 0;
    while(temp > 0){
      temp = temp / 10;
      numberOfDigits++;
    }
    int sum = 0;
    temp = num;
    while(temp > 0){
      int digit = temp % 10;
      sum += Math.pow(digit, numberOfDigits);
      temp /= 10;
    }
    if(num == sum){
      System.out.println(num + " is an amstrong number");
    }else{
      System.out.println(num + " is not an amstrong number");
    }
  }
}
