import java.util.Arrays;

public class bubbleSOrt {

    public static void sort(int a[]){
        for(int i = 0; i< a.length-1; i++){
            for(int j = 0; j < a.length-i-1; j++){
                if(a[j] > a[j+1]){
                    int temp = a[j];
                    a[j] = a[j+1];
                    a[j+1] = temp;
                }
            }
        }
        System.out.println(Arrays.toString(a));
    }
    public static void main(String args[]){
        int a [] = {4,3,5,9,1};
        sort(a);
    }
}
