import java.util.Scanner;

public class Palindrome{
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
    int temp = num, reversed = 0;
    while(temp > 0){
      int digit = temp % 10;
      reversed = reversed * 10 + digit;
      temp /= 10;
    }
    if(num == reversed){
      System.out.println(num + " is a Palindrome number");
    }else{
      System.out.println(num + " is not a Palindrome number");
    }
  }
}
