import java.util.Arrays;

public class selectionSort {

    public static void sort(int a[]){
        int n = a.length;

        for(int i = 0; i< n-1; i++){
            int min = i;
            for(int j = i+1; j < n; j++){
                if(a[j] < a[min]){
                    min = j;
                }
            }
            int temp = a[i];
            a[i] = a[min];
            a[min] = temp;
        }
        System.out.println(Arrays.toString(a));
    }
    public static void main(String[] args) {
        int a [] = {4,3,5,9,1}; //{4,3,5,1,9}
        sort(a);
    }
}
